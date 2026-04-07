package com.example.adminpanel.service.impl;

import com.example.adminpanel.dto.ProductDto;
import com.example.adminpanel.entity.Product;
import com.example.adminpanel.exception.ResourceNotFoundException;
import com.example.adminpanel.repository.ProductRepository;
import com.example.adminpanel.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Locale;

@Service
public class ProductServiceImpl implements ProductService {

    private static final int LOW_STOCK_THRESHOLD = 10;

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDto> getProducts(String search, String category, boolean featuredOnly, boolean lowStockOnly, int page, int size) {
        Pageable pageable = PageRequest.of(
            page,
            size,
            Sort.by(Sort.Order.asc("sortOrder"), Sort.Order.desc("featured"), Sort.Order.desc("createdAt"))
        );
        Page<Product> products = productRepository.searchCatalog(
            search == null ? "" : search.trim(),
            category == null ? "" : category.trim(),
            featuredOnly,
            lowStockOnly,
            LOW_STOCK_THRESHOLD,
            pageable
        );
        return products.map(this::mapToDto);
    }

    @Override
    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        Product product = new Product();
        applyProductChanges(product, productDto);
        return mapToDto(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));

        applyProductChanges(product, productDto);
        return mapToDto(productRepository.save(product));
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id " + id);
        }
        productRepository.deleteById(id);
    }

    private void applyProductChanges(Product product, ProductDto productDto) {
        String name = productDto.getName() == null ? "" : productDto.getName().trim();
        String category = normalize(productDto.getCategory());
        BigDecimal price = productDto.getPrice();
        Integer stockQuantity = productDto.getStockQuantity();

        if (name.isEmpty()) {
            throw new IllegalArgumentException("Product name is required");
        }
        if (price == null || price.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Price must be zero or greater");
        }
        if (stockQuantity == null || stockQuantity < 0) {
            throw new IllegalArgumentException("Stock quantity must be zero or greater");
        }
        if (productDto.getReviewCount() != null && productDto.getReviewCount() < 0) {
            throw new IllegalArgumentException("Review count must be zero or greater");
        }
        if (productDto.getSortOrder() != null && productDto.getSortOrder() < 0) {
            throw new IllegalArgumentException("Sort order must be zero or greater");
        }
        if (productDto.getRating() != null && productDto.getRating().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Rating must be zero or greater");
        }

        product.setName(name);
        product.setTagline(normalize(productDto.getTagline()));
        product.setCategory(category);
        product.setSlug(resolveUniqueSlug(productDto.getSlug(), name, product.getId()));
        product.setBadge(normalize(productDto.getBadge()));
        product.setPrice(price);
        product.setStockQuantity(stockQuantity);
        product.setFeatured(productDto.isFeatured());
        product.setHeroProduct(productDto.isHeroProduct());
        product.setActive(productDto.isActive());
        product.setOrganicCertified(productDto.isOrganicCertified());
        product.setDescription(normalize(productDto.getDescription()));
        product.setBenefits(normalize(productDto.getBenefits()));
        product.setIngredients(normalize(productDto.getIngredients()));
        product.setOriginRegion(normalize(productDto.getOriginRegion()));
        product.setUnitLabel(normalize(productDto.getUnitLabel()));
        product.setImageUrl(normalize(productDto.getImageUrl()));
        product.setRating(productDto.getRating());
        product.setReviewCount(defaultInteger(productDto.getReviewCount()));
        product.setSortOrder(defaultInteger(productDto.getSortOrder()));
    }

    private ProductDto mapToDto(Product product) {
        return new ProductDto(
            product.getId(),
            product.getName(),
            product.getTagline(),
            product.getCategory(),
            product.getSlug(),
            product.getBadge(),
            product.getPrice(),
            product.getStockQuantity(),
            product.isFeatured(),
            product.isHeroProduct(),
            product.isActive(),
            product.isOrganicCertified(),
            product.getDescription(),
            product.getBenefits(),
            product.getIngredients(),
            product.getOriginRegion(),
            product.getUnitLabel(),
            product.getImageUrl(),
            product.getRating(),
            product.getReviewCount(),
            product.getSortOrder()
        );
    }

    private String normalize(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private int defaultInteger(Integer value) {
        return value == null ? 0 : value;
    }

    private String resolveUniqueSlug(String requestedSlug, String name, Long productId) {
        String slugSeed = normalize(requestedSlug);
        String baseSlug = slugify(slugSeed == null ? name : slugSeed);
        if (baseSlug.isBlank()) {
            baseSlug = "jayas-organic-product";
        }

        Long resolvedId = productId == null ? -1L : productId;
        String candidate = baseSlug;
        int counter = 1;
        while (productRepository.existsBySlugIgnoreCaseAndIdNot(candidate, resolvedId)) {
            candidate = baseSlug + "-" + counter;
            counter += 1;
        }
        return candidate;
    }

    private String slugify(String value) {
        return value.toLowerCase(Locale.ROOT)
            .replaceAll("[^a-z0-9]+", "-")
            .replaceAll("(^-|-$)", "");
    }
}
