package com.example.adminpanel.dto;

import java.util.ArrayList;
import java.util.List;

public class StorefrontHomeDto {

    private String brandName;
    private String heroTitle;
    private String heroSubtitle;
    private String storyTitle;
    private String storyBody;
    private List<String> promisePoints = new ArrayList<>();
    private List<StorefrontStatDto> stats = new ArrayList<>();
    private List<ProductDto> featuredProducts = new ArrayList<>();
    private List<CategoryHighlightDto> categoryHighlights = new ArrayList<>();
    private List<TestimonialDto> testimonials = new ArrayList<>();

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getHeroTitle() {
        return heroTitle;
    }

    public void setHeroTitle(String heroTitle) {
        this.heroTitle = heroTitle;
    }

    public String getHeroSubtitle() {
        return heroSubtitle;
    }

    public void setHeroSubtitle(String heroSubtitle) {
        this.heroSubtitle = heroSubtitle;
    }

    public String getStoryTitle() {
        return storyTitle;
    }

    public void setStoryTitle(String storyTitle) {
        this.storyTitle = storyTitle;
    }

    public String getStoryBody() {
        return storyBody;
    }

    public void setStoryBody(String storyBody) {
        this.storyBody = storyBody;
    }

    public List<String> getPromisePoints() {
        return promisePoints;
    }

    public void setPromisePoints(List<String> promisePoints) {
        this.promisePoints = promisePoints;
    }

    public List<StorefrontStatDto> getStats() {
        return stats;
    }

    public void setStats(List<StorefrontStatDto> stats) {
        this.stats = stats;
    }

    public List<ProductDto> getFeaturedProducts() {
        return featuredProducts;
    }

    public void setFeaturedProducts(List<ProductDto> featuredProducts) {
        this.featuredProducts = featuredProducts;
    }

    public List<CategoryHighlightDto> getCategoryHighlights() {
        return categoryHighlights;
    }

    public void setCategoryHighlights(List<CategoryHighlightDto> categoryHighlights) {
        this.categoryHighlights = categoryHighlights;
    }

    public List<TestimonialDto> getTestimonials() {
        return testimonials;
    }

    public void setTestimonials(List<TestimonialDto> testimonials) {
        this.testimonials = testimonials;
    }

    public record StorefrontStatDto(String label, String value, String helper) {
    }

    public record CategoryHighlightDto(String category, long productCount, String description, String imageUrl) {
    }

    public record TestimonialDto(String name, String location, String quote) {
    }
}
