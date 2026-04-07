package com.example.adminpanel.service.impl;

import com.example.adminpanel.dto.UpdateUserRequest;
import com.example.adminpanel.dto.UserDto;
import com.example.adminpanel.entity.UserEntity;
import com.example.adminpanel.exception.ResourceNotFoundException;
import com.example.adminpanel.repository.UserRepository;
import com.example.adminpanel.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserDto> getUsers(String search, int page, int size) {
        return userRepository.searchUsers(
            search == null ? "" : search.trim(),
            PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))
        ).map(this::mapToDto);
    }

    @Override
    @Transactional
    public UserDto updateUser(Long id, UpdateUserRequest request) {
        UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));

        String email = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase(Locale.ROOT);
        String fullName = request.getFullName() == null ? null : request.getFullName().trim();

        if (email.isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (userRepository.existsByEmailIgnoreCaseAndIdNot(email, id)) {
            throw new IllegalArgumentException("Email is already in use");
        }

        user.setEmail(email);
        user.setFullName((fullName == null || fullName.isEmpty()) ? null : fullName);

        UserEntity updatedUser = userRepository.save(user);
        logger.info("Updated user {}", id);
        return mapToDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id " + id);
        }

        userRepository.deleteById(id);
        logger.info("Deleted user {}", id);
    }

    private UserDto mapToDto(UserEntity user) {
        return new UserDto(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFullName()
        );
    }
}
