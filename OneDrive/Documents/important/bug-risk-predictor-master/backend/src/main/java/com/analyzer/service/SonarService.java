package com.analyzer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Base64;

@Service
public class SonarService {

    @Value("${sonar.url}")
    private String sonarUrl;

    @Value("${sonar.token}")
    private String sonarToken;

    private WebClient getWebClient() {
        String encodedAuth = Base64.getEncoder().encodeToString((sonarToken + ":").getBytes());

        return WebClient.builder()
                .baseUrl(sonarUrl)
                .defaultHeader("Authorization", "Basic " + encodedAuth)
                .build();
    }

    /**
     * Get Sonar project quality metrics.
     * @param projectKey Sonar project key
     * @return JSON string with metrics
     */
    public String getProjectMetrics(String projectKey) {
        WebClient client = getWebClient();
        String url = "/api/measures/component?component=" + projectKey +
                "&metricKeys=bugs,vulnerabilities,code_smells,coverage";

        try {
            Mono<String> response = client.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class);

            return response.block(); // blocking for simplicity
        } catch (Exception e) {
            e.printStackTrace();
            return "{}";
        }
    }
}
