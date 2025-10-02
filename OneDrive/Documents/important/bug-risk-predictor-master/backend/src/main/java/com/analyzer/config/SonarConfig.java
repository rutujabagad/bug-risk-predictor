package com.analyzer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SonarConfig {

    @Value("${sonarqube.url}")
    private String sonarUrl;

    @Value("${sonarqube.token}")
    private String token;

    // Getters
    public String getSonarUrl() {
        return sonarUrl;
    }

    public String getToken() {
        return token;
    }
}
