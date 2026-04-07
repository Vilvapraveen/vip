package com.example.adminpanel.service;

import com.example.adminpanel.dto.StoreOrderRequest;
import com.example.adminpanel.dto.StoreOrderResponse;
import com.example.adminpanel.entity.OrderEntity;
import com.example.adminpanel.entity.OrderItem;
import com.example.adminpanel.entity.Product;
import com.example.adminpanel.entity.UserEntity;
import com.example.adminpanel.repository.NewsletterSubscriberRepository;
import com.example.adminpanel.repository.OrderRepository;
import com.example.adminpanel.repository.ProductRepository;
import com.example.adminpanel.repository.UserRepository;
import com.example.adminpanel.service.impl.StorefrontServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StorefrontServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private NewsletterSubscriberRepository newsletterSubscriberRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private StorefrontServiceImpl storefrontService;

    @Test
    void placeOrderReturnsExistingConfirmationWhenIdempotencyKeyRepeats() {
        StoreOrderRequest request = buildOrderRequest();

        OrderEntity existingOrder = new OrderEntity();
        existingOrder.setId(77L);
        existingOrder.setOrderReference("VX-EXISTING");
        existingOrder.setStatus("PENDING");
        existingOrder.setTotalPrice(new BigDecimal("1599.00"));
        existingOrder.setItems(List.of(createOrderItem(1), createOrderItem(2)));

        when(orderRepository.findByIdempotencyKey("same-request")).thenReturn(Optional.of(existingOrder));

        StoreOrderResponse response = storefrontService.placeOrder(request, " same-request ");

        assertEquals(77L, response.getOrderId());
        assertEquals("VX-EXISTING", response.getOrderReference());
        assertEquals(3, response.getTotalItems());
        assertTrue(response.getMessage().contains("already received"));
        verify(orderRepository).findByIdempotencyKey("same-request");
        verifyNoInteractions(productRepository, userRepository, newsletterSubscriberRepository, passwordEncoder);
    }

    @Test
    void placeOrderAggregatesDuplicateProductLinesBeforeSaving() {
        StoreOrderRequest request = buildOrderRequest();
        request.setItems(List.of(createLine(5L, 2), createLine(5L, 3)));

        UserEntity existingUser = new UserEntity();
        existingUser.setId(9L);
        existingUser.setUsername("buyer");
        existingUser.setEmail("buyer@example.com");
        existingUser.setFullName("Buyer Name");

        Product product = new Product();
        product.setId(5L);
        product.setName("Glow Serum Combo");
        product.setPrice(new BigDecimal("799.00"));
        product.setStockQuantity(20);
        product.setActive(true);

        when(orderRepository.findByIdempotencyKey("dedupe-key")).thenReturn(Optional.empty());
        when(userRepository.findByEmailIgnoreCase("buyer@example.com")).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(productRepository.findByIdForUpdate(5L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(OrderEntity.class))).thenAnswer(invocation -> {
            OrderEntity savedOrder = invocation.getArgument(0);
            savedOrder.setId(101L);
            return savedOrder;
        });

        StoreOrderResponse response = storefrontService.placeOrder(request, "dedupe-key");

        ArgumentCaptor<OrderEntity> orderCaptor = ArgumentCaptor.forClass(OrderEntity.class);
        verify(orderRepository).save(orderCaptor.capture());

        OrderEntity savedOrder = orderCaptor.getValue();
        assertEquals(1, savedOrder.getItems().size());
        assertEquals(5, savedOrder.getItems().get(0).getQuantity());
        assertEquals(15, product.getStockQuantity());
        assertEquals(101L, response.getOrderId());
        assertEquals(5, response.getTotalItems());
        assertEquals(new BigDecimal("3995.00"), response.getTotalAmount());
    }

    private StoreOrderRequest buildOrderRequest() {
        StoreOrderRequest request = new StoreOrderRequest();
        request.setCustomerName("Buyer Name");
        request.setCustomerEmail("buyer@example.com");
        request.setCustomerPhone("+91 9876543210");
        request.setShippingAddress("12 Market Street");
        request.setDeliveryCity("Chennai");
        request.setDeliveryState("Tamil Nadu");
        request.setDeliveryPincode("600001");
        request.setPaymentMethod("UPI");
        request.setOrderNotes("Leave at the door");
        request.setItems(List.of(createLine(1L, 1)));
        return request;
    }

    private StoreOrderRequest.OrderLineRequest createLine(Long productId, int quantity) {
        StoreOrderRequest.OrderLineRequest line = new StoreOrderRequest.OrderLineRequest();
        line.setProductId(productId);
        line.setQuantity(quantity);
        return line;
    }

    private OrderItem createOrderItem(int quantity) {
        OrderItem orderItem = new OrderItem();
        orderItem.setQuantity(quantity);
        return orderItem;
    }
}
