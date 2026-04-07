package com.example.adminpanel.service;

import com.example.adminpanel.dto.JwtResponse;
import com.example.adminpanel.dto.LoginRequest;

public interface AuthService {

    default JwtResponse login(LoginRequest loginRequest) {
        return login(loginRequest, "local");
    }

    JwtResponse login(LoginRequest loginRequest, String clientFingerprint);
}
