package com.example.adminpanel.service.impl;

import com.example.adminpanel.dto.NewsletterSubscriptionRequest;
import com.example.adminpanel.dto.NewsletterSubscriptionResponse;
import com.example.adminpanel.dto.ProductDto;
import com.example.adminpanel.dto.StoreOrderRequest;
import com.example.adminpanel.dto.StoreOrderResponse;
import com.example.adminpanel.dto.StorefrontHomeDto;
import com.example.adminpanel.entity.NewsletterSubscriber;
import com.example.adminpanel.entity.OrderEntity;
import com.example.adminpanel.entity.OrderItem;
import com.example.adminpanel.entity.Product;
import com.example.adminpanel.entity.UserEntity;
import com.example.adminpanel.exception.ResourceNotFoundException;
import com.example.adminpanel.repository.NewsletterSubscriberRepository;
import com.example.adminpanel.repository.OrderRepository;
import com.example.adminpanel.repository.ProductRepository;
import com.example.adminpanel.repository.UserRepository;
import com.example.adminpanel.service.StorefrontService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

@Service
public class StorefrontServiceImpl implements StorefrontService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final NewsletterSubscriberRepository newsletterSubscriberRepository;
    private final PasswordEncoder passwordEncoder;

    public StorefrontServiceImpl(
        ProductRepository productRepository,
        OrderRepository orderRepository,
        UserRepository userRepository,
        NewsletterSubscriberRepository newsletterSubscriberRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.newsletterSubscriberRepository = newsletterSubscriberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public StorefrontHomeDto getHomeContent() {
        List<Product> featuredProducts = productRepository.findTop8ByActiveTrueOrderByHeroProductDescFeaturedDescSortOrderAscCreatedAtDesc();
        List<Product> activeProducts = productRepository.findAll().stream()
            .filter(Product::isActive)
            .sorted((left, right) -> {
                int sortComparison = Integer.compare(defaultInteger(left.getSortOrder()), defaultInteger(right.getSortOrder()));
                if (sortComparison != 0) {
                    return sortComparison;
                }
                return right.getCreatedAt().compareTo(left.getCreatedAt());
            })
            .toList();

        Map<String, CategoryAccumulator> categoryAccumulators = new LinkedHashMap<>();
        for (Product product : activeProducts) {
            String category = normalizeCategory(product.getCategory());
            CategoryAccumulator accumulator = categoryAccumulators.computeIfAbsent(category, ignored -> new CategoryAccumulator());
            accumulator.productCount += 1;
            if (accumulator.imageUrl == null) {
                accumulator.imageUrl = product.getImageUrl();
            }
            if (accumulator.tagline == null) {
                accumulator.tagline = product.getTagline();
            }
        }

        StorefrontHomeDto dto = new StorefrontHomeDto();
        dto.setBrandName("VX Bazaar");
        dto.setHeroTitle("Trending picks across fashion, home, beauty, tech, and everyday essentials.");
        dto.setHeroSubtitle(
            "VX Bazaar combines dense product discovery, offer-led merchandising, fast checkout, and a secure seller workspace in one full-stack ecommerce project."
        );
        dto.setStoryTitle("Built like a lively marketplace, backed by real admin operations.");
        dto.setStoryBody(
            "This storefront blends multi-category browsing, checkout-ready backend workflows, and a secure management console so the customer experience and seller operations stay in one platform."
        );
        dto.setPromisePoints(List.of(
            "Multi-category product discovery that feels closer to large shopping apps.",
            "Promotional merchandising, fast category scanning, and trust-first checkout messaging.",
            "Checkout-ready backend with MySQL persistence, order tracking, and admin workflow control."
        ));
        dto.setStats(List.of(
            new StorefrontHomeDto.StorefrontStatDto("Live listings", String.valueOf(activeProducts.size()), "Curated and inventory-aware"),
            new StorefrontHomeDto.StorefrontStatDto("Active categories", String.valueOf(categoryAccumulators.size()), "From fashion lanes to household essentials"),
            new StorefrontHomeDto.StorefrontStatDto("Campaign signups", String.valueOf(newsletterSubscriberRepository.count()), "Newsletter members and launch subscribers"),
            new StorefrontHomeDto.StorefrontStatDto("Orders tracked", String.valueOf(orderRepository.count()), "Managed through the seller workspace")
        ));
        dto.setFeaturedProducts(featuredProducts.stream().map(this::mapToProductDto).toList());
        dto.setCategoryHighlights(categoryAccumulators.entrySet().stream()
            .map(entry -> new StorefrontHomeDto.CategoryHighlightDto(
                entry.getKey(),
                entry.getValue().productCount,
                defaultString(entry.getValue().tagline, "Popular listings surfaced for faster marketplace-style browsing."),
                defaultString(entry.getValue().imageUrl, "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80")
            ))
            .sorted((left, right) -> Long.compare(right.productCount(), left.productCount()))
            .limit(4)
            .toList());
        dto.setTestimonials(List.of(
            new StorefrontHomeDto.TestimonialDto(
                "Aarohi M.",
                "Pune",
                "The storefront feels familiar like a big shopping app, but it is cleaner and much easier to scan."
            ),
            new StorefrontHomeDto.TestimonialDto(
                "Rohit N.",
                "Bengaluru",
                "I could jump from fashion to gadgets to home products without the homepage feeling messy."
            ),
            new StorefrontHomeDto.TestimonialDto(
                "Megha S.",
                "Jaipur",
                "The deal cards and checkout flow make it feel like a real marketplace rather than a static demo."
            )
        ));
        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDto> getStoreProducts(String search, String category, boolean featuredOnly, boolean organicOnly, int page, int size) {
        Pageable pageable = PageRequest.of(
            page,
            size,
            Sort.by(Sort.Order.asc("sortOrder"), Sort.Order.desc("featured"), Sort.Order.desc("createdAt"))
        );
        return productRepository.searchStoreCatalog(
            normalizeSearch(search),
            normalizeFilter(category),
            featuredOnly,
            organicOnly,
            pageable
        ).map(this::mapToProductDto);
    }

    @Override
    @Transactional
    public StoreOrderResponse placeOrder(StoreOrderRequest request, String idempotencyKey) {
        String normalizedIdempotencyKey = normalizeIdempotencyKey(idempotencyKey);
        if (normalizedIdempotencyKey != null) {
            OrderEntity existingOrder = orderRepository.findByIdempotencyKey(normalizedIdempotencyKey).orElse(null);
            if (existingOrder != null) {
                return toStoreOrderResponse(
                    existingOrder,
                    "Order already received. Returning the previously created confirmation."
                );
            }
        }

        String customerName = normalizeRequired(request.getCustomerName(), "Customer name is required");
        String customerEmail = normalizeEmail(request.getCustomerEmail());
        String customerPhone = normalizeRequired(request.getCustomerPhone(), "Customer phone is required");
        String shippingAddress = normalizeRequired(request.getShippingAddress(), "Shipping address is required");
        String deliveryCity = normalizeRequired(request.getDeliveryCity(), "Delivery city is required");
        String deliveryState = normalizeRequired(request.getDeliveryState(), "Delivery state is required");
        String deliveryPincode = normalizeRequired(request.getDeliveryPincode(), "Pincode is required");
        String paymentMethod = normalizeRequired(request.getPaymentMethod(), "Payment method is required");
        Map<Long, Integer> requestedItems = collapseRequestedItems(request.getItems());

        if (!List.of("UPI", "COD", "Card").contains(paymentMethod)) {
            throw new IllegalArgumentException("Unsupported payment method selected");
        }
        if (requestedItems.size() > 20) {
            throw new IllegalArgumentException("A single order can include at most 20 distinct items");
        }

        UserEntity customer = findOrCreateCustomer(customerName, customerEmail);

        OrderEntity order = new OrderEntity();
        order.setUser(customer);
        order.setOrderReference(generateOrderReference());
        order.setIdempotencyKey(normalizedIdempotencyKey);
        order.setStatus("PENDING");
        order.setCustomerName(customerName);
        order.setCustomerEmail(customerEmail);
        order.setCustomerPhone(customerPhone);
        order.setShippingAddress(shippingAddress);
        order.setDeliveryCity(deliveryCity);
        order.setDeliveryState(deliveryState);
        order.setDeliveryPincode(deliveryPincode);
        order.setPaymentMethod(paymentMethod);
        order.setSalesChannel("WEBSITE");
        order.setOrderNotes(normalizeOptional(request.getOrderNotes()));

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;
        int totalItems = 0;

        for (Map.Entry<Long, Integer> entry : requestedItems.entrySet()) {
            Long productId = entry.getKey();
            int requestedQuantity = entry.getValue();
            Product product = productRepository.findByIdForUpdate(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));

            if (!product.isActive()) {
                throw new IllegalArgumentException("Product is not currently available: " + product.getName());
            }

            if (requestedQuantity > 10) {
                throw new IllegalArgumentException("A single product quantity must not exceed 10");
            }

            int availableQuantity = defaultInteger(product.getStockQuantity());
            if (availableQuantity < requestedQuantity) {
                throw new IllegalArgumentException("Only " + availableQuantity + " units left for " + product.getName());
            }

            product.setStockQuantity(availableQuantity - requestedQuantity);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(requestedQuantity);
            orderItem.setPrice(product.getPrice());
            orderItems.add(orderItem);

            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(requestedQuantity)));
            totalItems += requestedQuantity;
        }

        order.setItems(orderItems);
        order.setTotalPrice(totalAmount.setScale(2, RoundingMode.HALF_UP));

        try {
            OrderEntity savedOrder = orderRepository.save(order);
            return toStoreOrderResponse(
                savedOrder,
                "Order placed successfully. Our team will confirm the shipment timeline shortly."
            );
        } catch (DataIntegrityViolationException ex) {
            if (normalizedIdempotencyKey == null) {
                throw ex;
            }

            return orderRepository.findByIdempotencyKey(normalizedIdempotencyKey)
                .map(existingOrder -> toStoreOrderResponse(
                    existingOrder,
                    "Order already received. Returning the previously created confirmation."
                ))
                .orElseThrow(() -> ex);
        }
    }

    @Override
    @Transactional
    public NewsletterSubscriptionResponse subscribe(NewsletterSubscriptionRequest request) {
        String email = normalizeEmail(request.getEmail());
        NewsletterSubscriber subscriber = newsletterSubscriberRepository.findByEmailIgnoreCase(email)
            .orElseGet(NewsletterSubscriber::new);

        subscriber.setEmail(email);
        subscriber.setFirstName(normalizeOptional(request.getFirstName()));
        subscriber.setInterestArea(normalizeOptional(request.getInterestArea()));
        newsletterSubscriberRepository.save(subscriber);

        return new NewsletterSubscriptionResponse(
            email,
            "Thanks for subscribing to VX Bazaar. Fresh drops, fast deals, and curated launches are on the way."
        );
    }

    private UserEntity findOrCreateCustomer(String customerName, String customerEmail) {
        return userRepository.findByEmailIgnoreCase(customerEmail)
            .map(existingUser -> {
                existingUser.setFullName(customerName);
                return userRepository.save(existingUser);
            })
            .orElseGet(() -> {
                String username = resolveUniqueUsername(customerName, customerEmail);
                UserEntity user = new UserEntity(
                    username,
                    customerEmail,
                    passwordEncoder.encode(UUID.randomUUID().toString()),
                    customerName
                );
                return userRepository.save(user);
            });
    }

    private String resolveUniqueUsername(String customerName, String customerEmail) {
        String emailPrefix = customerEmail.contains("@") ? customerEmail.substring(0, customerEmail.indexOf('@')) : customerEmail;
        String candidate = slugSource(defaultString(emailPrefix, customerName)).replace("-", "");
        if (candidate.isBlank()) {
            candidate = "jayaorganicshopper";
        }

        String uniqueCandidate = candidate;
        int counter = 1;
        while (userRepository.existsByUsernameIgnoreCase(uniqueCandidate)) {
            uniqueCandidate = candidate + counter;
            counter += 1;
        }
        return uniqueCandidate;
    }

    private String generateOrderReference() {
        return "VX-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase(Locale.ROOT);
    }

    private ProductDto mapToProductDto(Product product) {
        return new ProductDto(
            product.getId(),
            product.getName(),
            product.getTagline(),
            product.getCategory(),
            product.getSlug(),
            product.getBadge(),
            product.getPrice(),
            product.getStockQuantity(),
            product.isFeatured(),
            product.isHeroProduct(),
            product.isActive(),
            product.isOrganicCertified(),
            product.getDescription(),
            product.getBenefits(),
            product.getIngredients(),
            product.getOriginRegion(),
            product.getUnitLabel(),
            product.getImageUrl(),
            product.getRating(),
            product.getReviewCount(),
            product.getSortOrder()
        );
    }

    private String normalizeSearch(String value) {
        return value == null ? "" : value.trim();
    }

    private String normalizeFilter(String value) {
        return value == null ? "" : value.trim();
    }

    private String normalizeCategory(String category) {
        if (category == null || category.isBlank()) {
            return "Everyday Essentials";
        }
        return category.trim();
    }

    private String normalizeOptional(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private String normalizeRequired(String value, String message) {
        String normalized = normalizeOptional(value);
        if (normalized == null) {
            throw new IllegalArgumentException(message);
        }
        return normalized;
    }

    private String normalizeEmail(String email) {
        String normalized = normalizeRequired(email, "Customer email is required").toLowerCase(Locale.ROOT);
        if (!normalized.contains("@")) {
            throw new IllegalArgumentException("Customer email must be valid");
        }
        return normalized;
    }

    private String normalizeIdempotencyKey(String value) {
        String normalized = normalizeOptional(value);
        if (normalized == null) {
            return null;
        }
        if (normalized.length() > 80) {
            throw new IllegalArgumentException("Idempotency key must not exceed 80 characters");
        }
        return normalized;
    }

    private Map<Long, Integer> collapseRequestedItems(List<StoreOrderRequest.OrderLineRequest> items) {
        Map<Long, Integer> requestedItems = new LinkedHashMap<>();

        for (StoreOrderRequest.OrderLineRequest itemRequest : items) {
            Long productId = itemRequest.getProductId();
            int quantity = defaultInteger(itemRequest.getQuantity());

            if (productId == null) {
                throw new IllegalArgumentException("Product id is required");
            }
            if (quantity <= 0) {
                throw new IllegalArgumentException("Quantity must be at least 1");
            }

            int aggregatedQuantity = requestedItems.getOrDefault(productId, 0) + quantity;
            if (aggregatedQuantity > 10) {
                throw new IllegalArgumentException("A single product quantity must not exceed 10");
            }
            requestedItems.put(productId, aggregatedQuantity);
        }

        return requestedItems;
    }

    private StoreOrderResponse toStoreOrderResponse(OrderEntity order, String message) {
        int totalItems = order.getItems().stream()
            .map(OrderItem::getQuantity)
            .filter(quantity -> quantity != null)
            .mapToInt(Integer::intValue)
            .sum();

        return new StoreOrderResponse(
            order.getId(),
            order.getOrderReference(),
            order.getStatus(),
            order.getTotalPrice(),
            totalItems,
            message
        );
    }

    private String defaultString(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value;
    }

    private int defaultInteger(Integer value) {
        return value == null ? 0 : value;
    }

    private String slugSource(String value) {
        return value.toLowerCase(Locale.ROOT)
            .replaceAll("[^a-z0-9]+", "-")
            .replaceAll("(^-|-$)", "");
    }

    private static final class CategoryAccumulator {
        private long productCount;
        private String imageUrl;
        private String tagline;
    }
}
