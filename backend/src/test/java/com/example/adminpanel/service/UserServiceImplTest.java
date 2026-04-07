package com.example.adminpanel.service;

import com.example.adminpanel.dto.UpdateUserRequest;
import com.example.adminpanel.dto.UserDto;
import com.example.adminpanel.entity.UserEntity;
import com.example.adminpanel.exception.ResourceNotFoundException;
import com.example.adminpanel.repository.UserRepository;
import com.example.adminpanel.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void updateUserNormalizesEmailAndReturnsResponseDto() {
        UserEntity user = new UserEntity();
        user.setId(7L);
        user.setUsername("jayauser");
        user.setEmail("old@example.com");
        user.setFullName("Old Name");

        UpdateUserRequest request = new UpdateUserRequest();
        request.setEmail(" NewMail@Example.com ");
        request.setFullName("Jaya Kumar");

        when(userRepository.findById(7L)).thenReturn(Optional.of(user));
        when(userRepository.existsByEmailIgnoreCaseAndIdNot("newmail@example.com", 7L)).thenReturn(false);
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserDto response = userService.updateUser(7L, request);

        assertEquals("newmail@example.com", response.getEmail());
        assertEquals("Jaya Kumar", response.getFullName());
    }

    @Test
    void updateUserRejectsUnknownUser() {
        UpdateUserRequest request = new UpdateUserRequest();
        request.setEmail("jaya@example.com");

        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.updateUser(99L, request));
    }
}
