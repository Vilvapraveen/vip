package com.example.adminpanel.controller;

import com.example.adminpanel.dto.NewsletterSubscriptionRequest;
import com.example.adminpanel.dto.NewsletterSubscriptionResponse;
import com.example.adminpanel.dto.ProductDto;
import com.example.adminpanel.dto.StoreOrderRequest;
import com.example.adminpanel.dto.StoreOrderResponse;
import com.example.adminpanel.dto.StorefrontHomeDto;
import com.example.adminpanel.service.StorefrontService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@Validated
@RequestMapping("/api/store")
public class StorefrontController {

    private final StorefrontService storefrontService;

    public StorefrontController(StorefrontService storefrontService) {
        this.storefrontService = storefrontService;
    }

    @GetMapping("/home")
    public StorefrontHomeDto getHome() {
        return storefrontService.getHomeContent();
    }

    @GetMapping("/products")
    public Page<ProductDto> getProducts(
        @RequestParam(defaultValue = "") String search,
        @RequestParam(defaultValue = "") String category,
        @RequestParam(defaultValue = "false") boolean featuredOnly,
        @RequestParam(defaultValue = "false") boolean organicOnly,
        @RequestParam(defaultValue = "0") @Min(value = 0, message = "Page must be zero or greater") int page,
        @RequestParam(defaultValue = "12") @Min(value = 1, message = "Size must be at least 1") @Max(value = 100, message = "Size must not exceed 100") int size
    ) {
        return storefrontService.getStoreProducts(search, category, featuredOnly, organicOnly, page, size);
    }

    @PostMapping("/orders")
    public ResponseEntity<StoreOrderResponse> placeOrder(
        @Valid @RequestBody StoreOrderRequest request,
        @RequestHeader(value = "Idempotency-Key", required = false) String idempotencyKey
    ) {
        StoreOrderResponse response = storefrontService.placeOrder(request, idempotencyKey);
        return ResponseEntity
            .created(URI.create("/api/store/orders/" + response.getOrderId()))
            .body(response);
    }

    @PostMapping("/newsletter")
    public ResponseEntity<NewsletterSubscriptionResponse> subscribe(@Valid @RequestBody NewsletterSubscriptionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(storefrontService.subscribe(request));
    }
}
