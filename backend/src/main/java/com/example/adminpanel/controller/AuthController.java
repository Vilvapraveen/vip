package com.example.adminpanel.controller;

import com.example.adminpanel.dto.JwtResponse;
import com.example.adminpanel.dto.LoginRequest;
import com.example.adminpanel.service.AuthService;
import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(
        @Valid @RequestBody LoginRequest loginRequest,
        HttpServletRequest request
    ) {
        return ResponseEntity.ok(authService.login(loginRequest, resolveClientFingerprint(request)));
    }

    private String resolveClientFingerprint(HttpServletRequest request) {
        return request.getRemoteAddr();
    }
}
