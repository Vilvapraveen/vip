package com.example.adminpanel.service;

import com.example.adminpanel.dto.ProductDto;
import org.springframework.data.domain.Page;

public interface ProductService {

    Page<ProductDto> getProducts(String search, String category, boolean featuredOnly, boolean lowStockOnly, int page, int size);

    ProductDto createProduct(ProductDto productDto);

    ProductDto updateProduct(Long id, ProductDto productDto);

    void deleteProduct(Long id);
}
