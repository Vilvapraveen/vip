package com.example.adminpanel.repository;

import com.example.adminpanel.entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmailIgnoreCase(String email);

    boolean existsByUsernameIgnoreCase(String username);

    @Query("""
        select u from UserEntity u
        where (
            :search = '' or
            lower(u.username) like lower(concat('%', :search, '%')) or
            lower(u.email) like lower(concat('%', :search, '%')) or
            lower(coalesce(u.fullName, '')) like lower(concat('%', :search, '%'))
        )
        """)
    Page<UserEntity> searchUsers(@Param("search") String search, Pageable pageable);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);
}
