package com.example.adminpanel.repository;

import com.example.adminpanel.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    @Override
    @EntityGraph(attributePaths = {"user", "items", "items.product"})
    List<OrderEntity> findAll();

    @Override
    @EntityGraph(attributePaths = {"user", "items", "items.product"})
    Page<OrderEntity> findAll(Pageable pageable);

    @Override
    @EntityGraph(attributePaths = {"user", "items", "items.product"})
    Optional<OrderEntity> findById(Long id);

    @EntityGraph(attributePaths = {"user", "items", "items.product"})
    Page<OrderEntity> findByStatusIgnoreCase(String status, Pageable pageable);

    @EntityGraph(attributePaths = {"user", "items", "items.product"})
    Optional<OrderEntity> findByIdempotencyKey(String idempotencyKey);
}
