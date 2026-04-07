package com.example.adminpanel.service;

import com.example.adminpanel.dto.JwtResponse;
import com.example.adminpanel.dto.LoginRequest;
import com.example.adminpanel.entity.Admin;
import com.example.adminpanel.exception.InvalidCredentialsException;
import com.example.adminpanel.repository.AdminRepository;
import com.example.adminpanel.security.JwtUtils;
import com.example.adminpanel.security.LoginAttemptService;
import com.example.adminpanel.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private AdminRepository adminRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        JwtUtils jwtUtils = new JwtUtils() {
            @Override
            public String generateToken(String username, String role) {
                return "jwt-token";
            }

            @Override
            public long calculateExpiryTimestamp() {
                return 123456789L;
            }
        };
        authService = new AuthServiceImpl(adminRepository, passwordEncoder, jwtUtils, new LoginAttemptService(5, 15));
    }

    @Test
    void loginReturnsJwtForValidCredentials() {
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword("encoded-password");
        admin.setRole("ADMIN");

        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("password");

        when(adminRepository.findByUsername("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("password", "encoded-password")).thenReturn(true);

        JwtResponse response = authService.login(request);

        assertEquals("jwt-token", response.getToken());
        assertEquals("admin", response.getUsername());
        assertEquals("ADMIN", response.getRole());
        assertEquals(123456789L, response.getExpiresAtEpochMs());
    }

    @Test
    void loginRejectsInvalidPassword() {
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword("encoded-password");
        admin.setRole("ADMIN");

        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("wrong-password");

        when(adminRepository.findByUsername("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("wrong-password", "encoded-password")).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> authService.login(request));
    }
}
