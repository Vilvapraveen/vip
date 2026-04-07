package com.example.adminpanel.controller;

import com.example.adminpanel.dto.InsightsReportDto;
import com.example.adminpanel.service.AdminService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin/reports")
public class ReportsController {

    private final AdminService adminService;

    public ReportsController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/overview")
    public InsightsReportDto getOverview() {
        return adminService.getInsightsReport();
    }
}
