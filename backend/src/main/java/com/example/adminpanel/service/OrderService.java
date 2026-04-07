package com.example.adminpanel.service;

import com.example.adminpanel.dto.OrderDto;
import com.example.adminpanel.dto.OrderStatusUpdateRequest;
import org.springframework.data.domain.Page;

public interface OrderService {

    Page<OrderDto> getOrders(String status, int page, int size);

    OrderDto updateStatus(Long id, OrderStatusUpdateRequest request);
}
