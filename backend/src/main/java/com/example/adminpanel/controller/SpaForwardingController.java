package com.example.adminpanel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardingController {

    @GetMapping({
        "/shop",
        "/checkout",
        "/wishlist",
        "/support",
        "/products/{slug}",
        "/admin",
        "/admin/{*path}"
    })
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
