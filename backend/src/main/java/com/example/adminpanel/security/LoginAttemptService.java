package com.example.adminpanel.security;

import com.example.adminpanel.exception.TooManyRequestsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class LoginAttemptService {

    private final int maxAttempts;
    private final Duration blockDuration;
    private final Map<String, AttemptWindow> attempts = new ConcurrentHashMap<>();

    public LoginAttemptService(
        @Value("${app.auth.max-login-attempts:5}") int maxAttempts,
        @Value("${app.auth.block-minutes:15}") long blockMinutes
    ) {
        this.maxAttempts = Math.max(maxAttempts, 3);
        this.blockDuration = Duration.ofMinutes(Math.max(blockMinutes, 1));
    }

    public void assertAllowed(String key) {
        AttemptWindow window = attempts.get(key);
        if (window == null) {
            return;
        }

        Instant now = Instant.now();
        if (window.blockedUntil != null && window.blockedUntil.isAfter(now)) {
            long remainingMinutes = Math.max(Duration.between(now, window.blockedUntil).toMinutes(), 1);
            throw new TooManyRequestsException(
                "Too many login attempts. Please try again in about " + remainingMinutes + " minute(s)."
            );
        }

        if (window.blockedUntil != null && !window.blockedUntil.isAfter(now)) {
            attempts.remove(key);
        }
    }

    public void recordFailure(String key) {
        attempts.compute(key, (ignored, current) -> {
            Instant now = Instant.now();
            AttemptWindow window = current == null ? new AttemptWindow() : current;

            if (window.blockedUntil != null && window.blockedUntil.isAfter(now)) {
                return window;
            }

            if (window.lastFailureAt == null || Duration.between(window.lastFailureAt, now).compareTo(blockDuration) > 0) {
                window.failureCount = 0;
            }

            window.failureCount += 1;
            window.lastFailureAt = now;

            if (window.failureCount >= maxAttempts) {
                window.blockedUntil = now.plus(blockDuration);
            }

            return window;
        });
    }

    public void recordSuccess(String key) {
        attempts.remove(key);
    }

    private static final class AttemptWindow {
        private int failureCount;
        private Instant lastFailureAt;
        private Instant blockedUntil;
    }
}
