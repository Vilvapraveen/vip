package com.example.adminpanel.dto;

import java.math.BigDecimal;

public class DashboardDto {

    private long totalProducts;
    private long totalOrders;
    private long totalUsers;
    private long lowStockProducts;
    private long featuredProducts;
    private long totalInventoryUnits;
    private long pendingOrders;
    private long processingOrders;
    private long shippedOrders;
    private long deliveredOrders;
    private BigDecimal totalRevenue;
    private BigDecimal averageOrderValue;

    public DashboardDto() {
    }

    public DashboardDto(
        long totalProducts,
        long totalOrders,
        long totalUsers,
        long lowStockProducts,
        long featuredProducts,
        long totalInventoryUnits,
        long pendingOrders,
        long processingOrders,
        long shippedOrders,
        long deliveredOrders,
        BigDecimal totalRevenue,
        BigDecimal averageOrderValue
    ) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.totalUsers = totalUsers;
        this.lowStockProducts = lowStockProducts;
        this.featuredProducts = featuredProducts;
        this.totalInventoryUnits = totalInventoryUnits;
        this.pendingOrders = pendingOrders;
        this.processingOrders = processingOrders;
        this.shippedOrders = shippedOrders;
        this.deliveredOrders = deliveredOrders;
        this.totalRevenue = totalRevenue;
        this.averageOrderValue = averageOrderValue;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(long lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }

    public long getFeaturedProducts() {
        return featuredProducts;
    }

    public void setFeaturedProducts(long featuredProducts) {
        this.featuredProducts = featuredProducts;
    }

    public long getTotalInventoryUnits() {
        return totalInventoryUnits;
    }

    public void setTotalInventoryUnits(long totalInventoryUnits) {
        this.totalInventoryUnits = totalInventoryUnits;
    }

    public long getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(long pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public long getProcessingOrders() {
        return processingOrders;
    }

    public void setProcessingOrders(long processingOrders) {
        this.processingOrders = processingOrders;
    }

    public long getShippedOrders() {
        return shippedOrders;
    }

    public void setShippedOrders(long shippedOrders) {
        this.shippedOrders = shippedOrders;
    }

    public long getDeliveredOrders() {
        return deliveredOrders;
    }

    public void setDeliveredOrders(long deliveredOrders) {
        this.deliveredOrders = deliveredOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public BigDecimal getAverageOrderValue() {
        return averageOrderValue;
    }

    public void setAverageOrderValue(BigDecimal averageOrderValue) {
        this.averageOrderValue = averageOrderValue;
    }
}
