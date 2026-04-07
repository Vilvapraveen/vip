package com.example.adminpanel.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@Profile("prod")
public class ProductionReadinessValidator {

    private static final String DEFAULT_ADMIN_PASSWORD = "ChangeMeAdmin123!";
    private static final String DEFAULT_JWT_SECRET = "ChangeThisDevelopmentJwtSecretKeyToSomethingLongAndSecure12345";

    @Value("${app.seed.admin-password}")
    private String adminPassword;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @PostConstruct
    void validateSecrets() {
        if (DEFAULT_ADMIN_PASSWORD.equals(adminPassword)) {
            throw new IllegalStateException("APP_ADMIN_PASSWORD must be changed before running with the prod profile");
        }

        if (DEFAULT_JWT_SECRET.equals(jwtSecret)) {
            throw new IllegalStateException("JWT_SECRET must be changed before running with the prod profile");
        }
    }
}
