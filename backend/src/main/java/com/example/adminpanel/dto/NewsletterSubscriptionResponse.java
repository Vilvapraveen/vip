package com.example.adminpanel.dto;

public class NewsletterSubscriptionResponse {

    private String email;
    private String message;

    public NewsletterSubscriptionResponse() {
    }

    public NewsletterSubscriptionResponse(String email, String message) {
        this.email = email;
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
