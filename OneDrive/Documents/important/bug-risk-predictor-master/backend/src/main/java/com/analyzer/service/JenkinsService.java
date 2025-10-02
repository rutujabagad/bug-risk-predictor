package com.analyzer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Base64;

@Service
public class JenkinsService {

    @Value("${jenkins.url}")
    private String jenkinsUrl;

    @Value("${jenkins.username}")
    private String jenkinsUsername;

    @Value("${jenkins.token}")
    private String jenkinsToken;

    private WebClient getWebClient() {
        String auth = jenkinsUsername + ":" + jenkinsToken;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

        return WebClient.builder()
                .baseUrl(jenkinsUrl)
                .defaultHeader("Authorization", "Basic " + encodedAuth)
                .build();
    }

    /**
     * Get the last build status of a Jenkins job.
     * @param jobName name of the Jenkins job
     * @return String: SUCCESS, FAILURE, etc.
     */
    public String getLastBuildStatus(String jobName) {
        WebClient client = getWebClient();
        String url = "/job/" + jobName + "/lastBuild/api/json";

        try {
            Mono<String> response = client.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class);

            String json = response.block(); // blocking for simplicity
            if (json != null && json.contains("\"result\":\"SUCCESS\"")) {
                return "SUCCESS";
            } else if (json != null && json.contains("\"result\":\"FAILURE\"")) {
                return "FAILURE";
            } else {
                return "UNKNOWN";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        }
    }
}
