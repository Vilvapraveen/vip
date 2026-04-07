package com.example.adminpanel.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

public class StoreOrderRequest {

    @NotBlank(message = "Customer name is required")
    @Size(max = 120, message = "Customer name must not exceed 120 characters")
    private String customerName;

    @NotBlank(message = "Customer email is required")
    @Email(message = "Customer email must be valid")
    @Size(max = 150, message = "Customer email must not exceed 150 characters")
    private String customerEmail;

    @NotBlank(message = "Customer phone is required")
    @Size(max = 30, message = "Customer phone must not exceed 30 characters")
    @Pattern(
        regexp = "^[0-9+()\\-\\s]{10,20}$",
        message = "Customer phone must be a valid contact number"
    )
    private String customerPhone;

    @NotBlank(message = "Shipping address is required")
    @Size(max = 500, message = "Shipping address must not exceed 500 characters")
    private String shippingAddress;

    @NotBlank(message = "Delivery city is required")
    @Size(max = 100, message = "Delivery city must not exceed 100 characters")
    private String deliveryCity;

    @NotBlank(message = "Delivery state is required")
    @Size(max = 100, message = "Delivery state must not exceed 100 characters")
    private String deliveryState;

    @NotBlank(message = "Pincode is required")
    @Size(max = 20, message = "Pincode must not exceed 20 characters")
    @Pattern(regexp = "^[0-9]{4,10}$", message = "Pincode must contain 4 to 10 digits")
    private String deliveryPincode;

    @NotBlank(message = "Payment method is required")
    @Size(max = 40, message = "Payment method must not exceed 40 characters")
    @Pattern(regexp = "^(UPI|COD|Card)$", message = "Payment method must be UPI, COD, or Card")
    private String paymentMethod;

    @Size(max = 500, message = "Order notes must not exceed 500 characters")
    private String orderNotes;

    @Valid
    @NotEmpty(message = "At least one item is required")
    private List<OrderLineRequest> items = new ArrayList<>();

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getDeliveryCity() {
        return deliveryCity;
    }

    public void setDeliveryCity(String deliveryCity) {
        this.deliveryCity = deliveryCity;
    }

    public String getDeliveryState() {
        return deliveryState;
    }

    public void setDeliveryState(String deliveryState) {
        this.deliveryState = deliveryState;
    }

    public String getDeliveryPincode() {
        return deliveryPincode;
    }

    public void setDeliveryPincode(String deliveryPincode) {
        this.deliveryPincode = deliveryPincode;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getOrderNotes() {
        return orderNotes;
    }

    public void setOrderNotes(String orderNotes) {
        this.orderNotes = orderNotes;
    }

    public List<OrderLineRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderLineRequest> items) {
        this.items = items;
    }

    public static class OrderLineRequest {

        @NotNull(message = "Product id is required")
        private Long productId;

        @NotNull(message = "Quantity is required")
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    }
}
