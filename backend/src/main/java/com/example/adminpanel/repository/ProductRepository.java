package com.example.adminpanel.repository;

import com.example.adminpanel.entity.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByNameIgnoreCase(String name);

    Optional<Product> findBySlug(String slug);

    boolean existsBySlugIgnoreCaseAndIdNot(String slug, Long id);

    @Query("""
        select p from Product p
        where p.active = true
        and (
            :search = '' or
            lower(p.name) like lower(concat('%', :search, '%')) or
            lower(coalesce(p.category, '')) like lower(concat('%', :search, '%')) or
            lower(coalesce(p.tagline, '')) like lower(concat('%', :search, '%'))
        )
        and (
            :category = '' or
            lower(coalesce(p.category, '')) = lower(:category)
        )
        and (
            :featuredOnly = false or
            p.featured = true
        )
        and (
            :organicOnly = false or
            p.organicCertified = true
        )
        """)
    Page<Product> searchStoreCatalog(
        @Param("search") String search,
        @Param("category") String category,
        @Param("featuredOnly") boolean featuredOnly,
        @Param("organicOnly") boolean organicOnly,
        Pageable pageable
    );

    @Query("""
        select p from Product p
        where (
            :search = '' or
            lower(p.name) like lower(concat('%', :search, '%')) or
            lower(coalesce(p.category, '')) like lower(concat('%', :search, '%')) or
            lower(coalesce(p.tagline, '')) like lower(concat('%', :search, '%'))
        )
        and (
            :category = '' or
            lower(coalesce(p.category, '')) = lower(:category)
        )
        and (
            :featuredOnly = false or
            p.featured = true
        )
        and (
            :lowStockOnly = false or
            p.stockQuantity <= :lowStockThreshold
        )
        """)
    Page<Product> searchCatalog(
        @Param("search") String search,
        @Param("category") String category,
        @Param("featuredOnly") boolean featuredOnly,
        @Param("lowStockOnly") boolean lowStockOnly,
        @Param("lowStockThreshold") int lowStockThreshold,
        Pageable pageable
    );

    List<Product> findTop8ByActiveTrueOrderByHeroProductDescFeaturedDescSortOrderAscCreatedAtDesc();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Product p where p.id = :id")
    Optional<Product> findByIdForUpdate(@Param("id") Long id);
}
