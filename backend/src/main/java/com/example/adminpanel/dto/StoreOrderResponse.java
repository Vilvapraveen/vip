package com.example.adminpanel.dto;

import java.math.BigDecimal;

public class StoreOrderResponse {

    private Long orderId;
    private String orderReference;
    private String status;
    private BigDecimal totalAmount;
    private int totalItems;
    private String message;

    public StoreOrderResponse() {
    }

    public StoreOrderResponse(
        Long orderId,
        String orderReference,
        String status,
        BigDecimal totalAmount,
        int totalItems,
        String message
    ) {
        this.orderId = orderId;
        this.orderReference = orderReference;
        this.status = status;
        this.totalAmount = totalAmount;
        this.totalItems = totalItems;
        this.message = message;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getOrderReference() {
        return orderReference;
    }

    public void setOrderReference(String orderReference) {
        this.orderReference = orderReference;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
