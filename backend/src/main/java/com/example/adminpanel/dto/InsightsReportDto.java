package com.example.adminpanel.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class InsightsReportDto {

    private Instant generatedAt;
    private BigDecimal totalCatalogValue;
    private long totalUnitsSold;
    private BigDecimal fulfillmentCompletionRate;
    private String topCategory;
    private List<CategoryInsight> categoryInsights = new ArrayList<>();
    private List<StatusRevenue> revenueByStatus = new ArrayList<>();
    private List<TopProduct> topProducts = new ArrayList<>();
    private List<LowStockProduct> lowStockProducts = new ArrayList<>();
    private List<RecentOrder> recentOrders = new ArrayList<>();

    public Instant getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(Instant generatedAt) {
        this.generatedAt = generatedAt;
    }

    public BigDecimal getTotalCatalogValue() {
        return totalCatalogValue;
    }

    public void setTotalCatalogValue(BigDecimal totalCatalogValue) {
        this.totalCatalogValue = totalCatalogValue;
    }

    public long getTotalUnitsSold() {
        return totalUnitsSold;
    }

    public void setTotalUnitsSold(long totalUnitsSold) {
        this.totalUnitsSold = totalUnitsSold;
    }

    public BigDecimal getFulfillmentCompletionRate() {
        return fulfillmentCompletionRate;
    }

    public void setFulfillmentCompletionRate(BigDecimal fulfillmentCompletionRate) {
        this.fulfillmentCompletionRate = fulfillmentCompletionRate;
    }

    public String getTopCategory() {
        return topCategory;
    }

    public void setTopCategory(String topCategory) {
        this.topCategory = topCategory;
    }

    public List<CategoryInsight> getCategoryInsights() {
        return categoryInsights;
    }

    public void setCategoryInsights(List<CategoryInsight> categoryInsights) {
        this.categoryInsights = categoryInsights;
    }

    public List<StatusRevenue> getRevenueByStatus() {
        return revenueByStatus;
    }

    public void setRevenueByStatus(List<StatusRevenue> revenueByStatus) {
        this.revenueByStatus = revenueByStatus;
    }

    public List<TopProduct> getTopProducts() {
        return topProducts;
    }

    public void setTopProducts(List<TopProduct> topProducts) {
        this.topProducts = topProducts;
    }

    public List<LowStockProduct> getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(List<LowStockProduct> lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }

    public List<RecentOrder> getRecentOrders() {
        return recentOrders;
    }

    public void setRecentOrders(List<RecentOrder> recentOrders) {
        this.recentOrders = recentOrders;
    }

    public record CategoryInsight(
        String category,
        long productCount,
        long featuredCount,
        long inventoryUnits,
        BigDecimal catalogValue
    ) {
    }

    public record StatusRevenue(
        String status,
        long orderCount,
        BigDecimal revenue
    ) {
    }

    public record TopProduct(
        Long productId,
        String name,
        String category,
        boolean featured,
        int stockQuantity,
        long orderedUnits,
        BigDecimal revenue
    ) {
    }

    public record LowStockProduct(
        Long productId,
        String name,
        String category,
        boolean featured,
        int stockQuantity
    ) {
    }

    public record RecentOrder(
        Long orderId,
        String username,
        String status,
        BigDecimal totalPrice,
        Instant createdAt,
        int itemCount
    ) {
    }
}
