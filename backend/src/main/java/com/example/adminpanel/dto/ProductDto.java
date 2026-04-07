package com.example.adminpanel.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class ProductDto {

    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(max = 120, message = "Product name must not exceed 120 characters")
    private String name;

    @Size(max = 180, message = "Tagline must not exceed 180 characters")
    private String tagline;

    @Size(max = 80, message = "Category must not exceed 80 characters")
    private String category;

    @Size(max = 160, message = "Slug must not exceed 160 characters")
    private String slug;

    @Size(max = 60, message = "Badge must not exceed 60 characters")
    private String badge;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be zero or greater")
    private BigDecimal price;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity must be zero or greater")
    private Integer stockQuantity;

    private boolean featured;

    private boolean heroProduct;

    private boolean active = true;

    private boolean organicCertified = true;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @Size(max = 2000, message = "Benefits must not exceed 2000 characters")
    private String benefits;

    @Size(max = 2000, message = "Ingredients must not exceed 2000 characters")
    private String ingredients;

    @Size(max = 120, message = "Origin region must not exceed 120 characters")
    private String originRegion;

    @Size(max = 60, message = "Unit label must not exceed 60 characters")
    private String unitLabel;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;

    @DecimalMin(value = "0.0", inclusive = true, message = "Rating must be zero or greater")
    private BigDecimal rating;

    @Min(value = 0, message = "Review count must be zero or greater")
    private Integer reviewCount;

    @Min(value = 0, message = "Sort order must be zero or greater")
    private Integer sortOrder;

    public ProductDto() {
    }

    public ProductDto(
        Long id,
        String name,
        String tagline,
        String category,
        String slug,
        String badge,
        BigDecimal price,
        Integer stockQuantity,
        boolean featured,
        boolean heroProduct,
        boolean active,
        boolean organicCertified,
        String description,
        String benefits,
        String ingredients,
        String originRegion,
        String unitLabel,
        String imageUrl,
        BigDecimal rating,
        Integer reviewCount,
        Integer sortOrder
    ) {
        this.id = id;
        this.name = name;
        this.tagline = tagline;
        this.category = category;
        this.slug = slug;
        this.badge = badge;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.featured = featured;
        this.heroProduct = heroProduct;
        this.active = active;
        this.organicCertified = organicCertified;
        this.description = description;
        this.benefits = benefits;
        this.ingredients = ingredients;
        this.originRegion = originRegion;
        this.unitLabel = unitLabel;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public boolean isHeroProduct() {
        return heroProduct;
    }

    public void setHeroProduct(boolean heroProduct) {
        this.heroProduct = heroProduct;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isOrganicCertified() {
        return organicCertified;
    }

    public void setOrganicCertified(boolean organicCertified) {
        this.organicCertified = organicCertified;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getOriginRegion() {
        return originRegion;
    }

    public void setOriginRegion(String originRegion) {
        this.originRegion = originRegion;
    }

    public String getUnitLabel() {
        return unitLabel;
    }

    public void setUnitLabel(String unitLabel) {
        this.unitLabel = unitLabel;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
