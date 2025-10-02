package com.analyzer.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JenkinsConfig {

    @Value("${jenkins.url}")
    private String jenkinsUrl;

    @Value("${jenkins.username}")
    private String username;

    @Value("${jenkins.token}")
    private String token;

    // Getters
    public String getJenkinsUrl() {
        return jenkinsUrl;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }
}
