package com.example.adminpanel.service.impl;

import com.example.adminpanel.dto.JwtResponse;
import com.example.adminpanel.dto.LoginRequest;
import com.example.adminpanel.entity.Admin;
import com.example.adminpanel.exception.InvalidCredentialsException;
import com.example.adminpanel.repository.AdminRepository;
import com.example.adminpanel.security.JwtUtils;
import com.example.adminpanel.security.LoginAttemptService;
import com.example.adminpanel.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final LoginAttemptService loginAttemptService;

    public AuthServiceImpl(
        AdminRepository adminRepository,
        PasswordEncoder passwordEncoder,
        JwtUtils jwtUtils,
        LoginAttemptService loginAttemptService
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.loginAttemptService = loginAttemptService;
    }

    public JwtResponse login(LoginRequest loginRequest) {
        return login(loginRequest, "local");
    }

    @Override
    @Transactional(readOnly = true)
    public JwtResponse login(LoginRequest loginRequest, String clientFingerprint) {
        String username = loginRequest.getUsername().trim();
        String rawPassword = loginRequest.getPassword();
        String loginKey = (username.toLowerCase() + "|" + clientFingerprint).trim();

        loginAttemptService.assertAllowed(loginKey);

        Admin admin = adminRepository.findByUsername(username)
            .orElseThrow(() -> {
                loginAttemptService.recordFailure(loginKey);
                return new InvalidCredentialsException("Invalid username or password");
            });

        if (!passwordEncoder.matches(rawPassword, admin.getPassword())) {
            logger.warn("Invalid credentials for username='{}'", username);
            loginAttemptService.recordFailure(loginKey);
            throw new InvalidCredentialsException("Invalid username or password");
        }

        loginAttemptService.recordSuccess(loginKey);
        String token = jwtUtils.generateToken(username, admin.getRole());
        return new JwtResponse(
            token,
            "Bearer",
            admin.getUsername(),
            admin.getRole(),
            jwtUtils.calculateExpiryTimestamp()
        );
    }
}
