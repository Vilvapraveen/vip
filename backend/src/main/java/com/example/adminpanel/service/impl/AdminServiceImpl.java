package com.example.adminpanel.service.impl;

import com.example.adminpanel.dto.DashboardDto;
import com.example.adminpanel.dto.InsightsReportDto;
import com.example.adminpanel.entity.OrderEntity;
import com.example.adminpanel.entity.OrderItem;
import com.example.adminpanel.entity.Product;
import com.example.adminpanel.repository.OrderRepository;
import com.example.adminpanel.repository.ProductRepository;
import com.example.adminpanel.repository.UserRepository;
import com.example.adminpanel.service.AdminService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    private static final int LOW_STOCK_THRESHOLD = 10;
    private static final List<String> REPORT_STATUSES = List.of("PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED");

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public AdminServiceImpl(
        ProductRepository productRepository,
        OrderRepository orderRepository,
        UserRepository userRepository
    ) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardDto getDashboardMetrics() {
        List<Product> products = productRepository.findAll();
        List<OrderEntity> orders = orderRepository.findAll();

        long lowStockProducts = products.stream()
            .filter(product -> product.getStockQuantity() != null && product.getStockQuantity() <= LOW_STOCK_THRESHOLD)
            .count();
        long featuredProducts = products.stream()
            .filter(Product::isFeatured)
            .count();
        long totalInventoryUnits = products.stream()
            .map(Product::getStockQuantity)
            .filter(quantity -> quantity != null)
            .mapToLong(Integer::longValue)
            .sum();

        long pendingOrders = countOrdersByStatus(orders, "PENDING");
        long processingOrders = countOrdersByStatus(orders, "PROCESSING");
        long shippedOrders = countOrdersByStatus(orders, "SHIPPED");
        long deliveredOrders = countOrdersByStatus(orders, "DELIVERED");

        BigDecimal totalRevenue = orders.stream()
            .map(OrderEntity::getTotalPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal averageOrderValue = orders.isEmpty()
            ? BigDecimal.ZERO
            : totalRevenue.divide(BigDecimal.valueOf(orders.size()), 2, RoundingMode.HALF_UP);

        return new DashboardDto(
            products.size(),
            orders.size(),
            userRepository.count(),
            lowStockProducts,
            featuredProducts,
            totalInventoryUnits,
            pendingOrders,
            processingOrders,
            shippedOrders,
            deliveredOrders,
            totalRevenue,
            averageOrderValue
        );
    }

    @Override
    @Transactional(readOnly = true)
    public InsightsReportDto getInsightsReport() {
        List<Product> products = productRepository.findAll();
        List<OrderEntity> orders = orderRepository.findAll();

        // Track sales performance separately from the catalog so reporting stays independent of entity shape.
        Map<Long, ProductPerformanceAccumulator> productPerformance = new LinkedHashMap<>();
        for (Product product : products) {
            productPerformance.put(product.getId(), new ProductPerformanceAccumulator());
        }

        Map<String, StatusAccumulator> statusAccumulators = new LinkedHashMap<>();
        for (String status : REPORT_STATUSES) {
            statusAccumulators.put(status, new StatusAccumulator());
        }

        long totalUnitsSold = 0;
        for (OrderEntity order : orders) {
            String normalizedStatus = normalizeStatus(order.getStatus());
            StatusAccumulator statusAccumulator = statusAccumulators.computeIfAbsent(normalizedStatus, ignored -> new StatusAccumulator());
            statusAccumulator.orderCount += 1;
            statusAccumulator.revenue = statusAccumulator.revenue.add(defaultMoney(order.getTotalPrice()));

            for (OrderItem item : order.getItems()) {
                if (item.getProduct() == null || item.getProduct().getId() == null) {
                    continue;
                }

                int quantity = item.getQuantity() == null ? 0 : item.getQuantity();
                BigDecimal lineRevenue = defaultMoney(item.getPrice()).multiply(BigDecimal.valueOf(quantity));
                ProductPerformanceAccumulator performance = productPerformance.computeIfAbsent(
                    item.getProduct().getId(),
                    ignored -> new ProductPerformanceAccumulator()
                );
                performance.orderedUnits += quantity;
                performance.revenue = performance.revenue.add(lineRevenue);
                totalUnitsSold += quantity;
            }
        }

        Map<String, CategoryAccumulator> categoryAccumulators = new LinkedHashMap<>();
        BigDecimal totalCatalogValue = BigDecimal.ZERO;
        for (Product product : products) {
            String category = normalizeCategory(product.getCategory());
            int stockQuantity = product.getStockQuantity() == null ? 0 : product.getStockQuantity();
            BigDecimal catalogValue = defaultMoney(product.getPrice()).multiply(BigDecimal.valueOf(stockQuantity));
            totalCatalogValue = totalCatalogValue.add(catalogValue);

            CategoryAccumulator accumulator = categoryAccumulators.computeIfAbsent(category, ignored -> new CategoryAccumulator());
            accumulator.productCount += 1;
            accumulator.inventoryUnits += stockQuantity;
            accumulator.catalogValue = accumulator.catalogValue.add(catalogValue);
            if (product.isFeatured()) {
                accumulator.featuredCount += 1;
            }
        }

        List<InsightsReportDto.CategoryInsight> categoryInsights = categoryAccumulators.entrySet().stream()
            .map(entry -> new InsightsReportDto.CategoryInsight(
                entry.getKey(),
                entry.getValue().productCount,
                entry.getValue().featuredCount,
                entry.getValue().inventoryUnits,
                entry.getValue().catalogValue
            ))
            .sorted((left, right) -> {
                int valueComparison = right.catalogValue().compareTo(left.catalogValue());
                if (valueComparison != 0) {
                    return valueComparison;
                }
                return left.category().compareToIgnoreCase(right.category());
            })
            .toList();

        List<InsightsReportDto.StatusRevenue> revenueByStatus = statusAccumulators.entrySet().stream()
            .map(entry -> new InsightsReportDto.StatusRevenue(
                entry.getKey(),
                entry.getValue().orderCount,
                entry.getValue().revenue
            ))
            .toList();

        List<InsightsReportDto.TopProduct> topProducts = products.stream()
            .map(product -> {
                ProductPerformanceAccumulator performance = productPerformance.getOrDefault(product.getId(), new ProductPerformanceAccumulator());
                return new InsightsReportDto.TopProduct(
                    product.getId(),
                    product.getName(),
                    normalizeCategory(product.getCategory()),
                    product.isFeatured(),
                    product.getStockQuantity() == null ? 0 : product.getStockQuantity(),
                    performance.orderedUnits,
                    performance.revenue
                );
            })
            .sorted((left, right) -> {
                int revenueComparison = right.revenue().compareTo(left.revenue());
                if (revenueComparison != 0) {
                    return revenueComparison;
                }
                int unitsComparison = Long.compare(right.orderedUnits(), left.orderedUnits());
                if (unitsComparison != 0) {
                    return unitsComparison;
                }
                return left.name().compareToIgnoreCase(right.name());
            })
            .limit(5)
            .toList();

        List<InsightsReportDto.LowStockProduct> lowStockProducts = products.stream()
            .filter(product -> product.getStockQuantity() != null && product.getStockQuantity() <= LOW_STOCK_THRESHOLD)
            .sorted(Comparator
                .comparingInt((Product product) -> product.getStockQuantity() == null ? 0 : product.getStockQuantity())
                .thenComparing(Product::getName, String.CASE_INSENSITIVE_ORDER))
            .map(product -> new InsightsReportDto.LowStockProduct(
                product.getId(),
                product.getName(),
                normalizeCategory(product.getCategory()),
                product.isFeatured(),
                product.getStockQuantity() == null ? 0 : product.getStockQuantity()
            ))
            .toList();

        List<InsightsReportDto.RecentOrder> recentOrders = orders.stream()
            .sorted(Comparator.comparing(OrderEntity::getCreatedAt).reversed())
            .limit(6)
            .map(order -> new InsightsReportDto.RecentOrder(
                order.getId(),
                order.getUser() == null ? "Unknown" : order.getUser().getUsername(),
                normalizeStatus(order.getStatus()),
                defaultMoney(order.getTotalPrice()),
                order.getCreatedAt(),
                order.getItems().stream()
                    .map(OrderItem::getQuantity)
                    .filter(quantity -> quantity != null)
                    .mapToInt(Integer::intValue)
                    .sum()
            ))
            .toList();

        long activeFulfillmentOrders = orders.stream()
            .filter(order -> {
                String status = normalizeStatus(order.getStatus());
                return "SHIPPED".equals(status) || "DELIVERED".equals(status);
            })
            .count();

        BigDecimal fulfillmentCompletionRate = orders.isEmpty()
            ? BigDecimal.ZERO
            : BigDecimal.valueOf(activeFulfillmentOrders)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(orders.size()), 2, RoundingMode.HALF_UP);

        InsightsReportDto report = new InsightsReportDto();
        report.setGeneratedAt(Instant.now());
        report.setTotalCatalogValue(totalCatalogValue);
        report.setTotalUnitsSold(totalUnitsSold);
        report.setFulfillmentCompletionRate(fulfillmentCompletionRate);
        report.setTopCategory(categoryInsights.isEmpty() ? "N/A" : categoryInsights.get(0).category());
        report.setCategoryInsights(categoryInsights);
        report.setRevenueByStatus(revenueByStatus);
        report.setTopProducts(topProducts);
        report.setLowStockProducts(lowStockProducts);
        report.setRecentOrders(recentOrders);
        return report;
    }

    private long countOrdersByStatus(List<OrderEntity> orders, String status) {
        return orders.stream()
            .filter(order -> status.equalsIgnoreCase(order.getStatus()))
            .count();
    }

    private String normalizeCategory(String category) {
        if (category == null || category.isBlank()) {
            return "Uncategorized";
        }
        return category.trim();
    }

    private String normalizeStatus(String status) {
        if (status == null || status.isBlank()) {
            return "UNKNOWN";
        }
        return status.trim().toUpperCase(Locale.ROOT);
    }

    private BigDecimal defaultMoney(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }

    private static final class CategoryAccumulator {
        private long productCount;
        private long featuredCount;
        private long inventoryUnits;
        private BigDecimal catalogValue = BigDecimal.ZERO;
    }

    private static final class ProductPerformanceAccumulator {
        private long orderedUnits;
        private BigDecimal revenue = BigDecimal.ZERO;
    }

    private static final class StatusAccumulator {
        private long orderCount;
        private BigDecimal revenue = BigDecimal.ZERO;
    }
}
