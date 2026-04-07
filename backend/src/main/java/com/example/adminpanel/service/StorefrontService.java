package com.example.adminpanel.service;

import com.example.adminpanel.dto.NewsletterSubscriptionRequest;
import com.example.adminpanel.dto.NewsletterSubscriptionResponse;
import com.example.adminpanel.dto.ProductDto;
import com.example.adminpanel.dto.StoreOrderRequest;
import com.example.adminpanel.dto.StoreOrderResponse;
import com.example.adminpanel.dto.StorefrontHomeDto;
import org.springframework.data.domain.Page;

public interface StorefrontService {

    StorefrontHomeDto getHomeContent();

    Page<ProductDto> getStoreProducts(String search, String category, boolean featuredOnly, boolean organicOnly, int page, int size);

    StoreOrderResponse placeOrder(StoreOrderRequest request, String idempotencyKey);

    NewsletterSubscriptionResponse subscribe(NewsletterSubscriptionRequest request);
}
