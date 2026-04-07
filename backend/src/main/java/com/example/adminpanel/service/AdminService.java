package com.example.adminpanel.service;

import com.example.adminpanel.dto.DashboardDto;
import com.example.adminpanel.dto.InsightsReportDto;

public interface AdminService {

    DashboardDto getDashboardMetrics();

    InsightsReportDto getInsightsReport();
}
