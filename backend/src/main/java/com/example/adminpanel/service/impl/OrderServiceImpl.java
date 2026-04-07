package com.example.adminpanel.service.impl;

import com.example.adminpanel.dto.OrderDto;
import com.example.adminpanel.dto.OrderStatusUpdateRequest;
import com.example.adminpanel.entity.OrderEntity;
import com.example.adminpanel.entity.OrderItem;
import com.example.adminpanel.exception.ResourceNotFoundException;
import com.example.adminpanel.repository.OrderRepository;
import com.example.adminpanel.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Set<String> ALLOWED_STATUSES = Set.of("PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED");

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderDto> getOrders(String status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        if (status == null || status.isBlank() || "ALL".equalsIgnoreCase(status)) {
            return orderRepository.findAll(pageable).map(this::mapToDto);
        }
        return orderRepository.findByStatusIgnoreCase(status.trim(), pageable).map(this::mapToDto);
    }

    @Override
    @Transactional
    public OrderDto updateStatus(Long id, OrderStatusUpdateRequest request) {
        OrderEntity order = orderRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));

        String normalizedStatus = request.getStatus() == null
            ? ""
            : request.getStatus().trim().toUpperCase(Locale.ROOT);

        if (!ALLOWED_STATUSES.contains(normalizedStatus)) {
            throw new IllegalArgumentException("Unsupported order status: " + normalizedStatus);
        }

        order.setStatus(normalizedStatus);
        return mapToDto(orderRepository.save(order));
    }

    private OrderDto mapToDto(OrderEntity order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderReference(order.getOrderReference());
        dto.setUsername(order.getUser().getUsername());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setCustomerPhone(order.getCustomerPhone());
        dto.setStatus(order.getStatus());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setDeliveryCity(order.getDeliveryCity());
        dto.setDeliveryState(order.getDeliveryState());
        dto.setDeliveryPincode(order.getDeliveryPincode());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setSalesChannel(order.getSalesChannel());
        dto.setOrderNotes(order.getOrderNotes());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setItems(order.getItems().stream().map(this::mapItem).toList());
        return dto;
    }

    private OrderDto.OrderItemDto mapItem(OrderItem item) {
        OrderDto.OrderItemDto dto = new OrderDto.OrderItemDto();
        dto.setProductName(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        return dto;
    }
}
