package com.analyzer.service;

import com.analyzer.model.AnalysisResult;
import com.analyzer.model.Repo;
import com.analyzer.repository.AnalysisRepository;
import com.analyzer.repository.RepoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AnalysisService {

    @Autowired
    private JenkinsService jenkinsService;

    @Autowired
    private SonarService sonarService;

    @Autowired
    private RepoRepository repoRepository;

    @Autowired
    private AnalysisRepository analysisRepository;

    private Random random = new Random();

    /**
     * Analyze a repository: fetch Jenkins & Sonar data, compute scores, save to DB
     */
    public AnalysisResult analyzeRepo(String repoUrl, String jobName, String sonarProjectKey) {

        // Save or find repo
        Repo repo = repoRepository.findByRepoUrl(repoUrl)
                .orElseGet(() -> {
                    Repo newRepo = new Repo();
                    newRepo.setRepoUrl(repoUrl);
                    return repoRepository.save(newRepo);
                });

        // 1️⃣ Jenkins Score (simulate or real)
        String jenkinsStatus = jenkinsService.getLastBuildStatus(jobName);
        int jenkinsScore = switch (jenkinsStatus) {
            case "SUCCESS" -> 90 + random.nextInt(6); // 90-95
            case "FAILURE" -> 50 + random.nextInt(20); // 50-70
            default -> 70 + random.nextInt(11); // 70-80
        };

        // 2️⃣ Sonar Score
        String sonarMetricsJson = sonarService.getProjectMetrics(sonarProjectKey);
        int sonarScore = parseSonarScore(sonarMetricsJson); // implement method to extract metrics

        // 3️⃣ Bug Risk (simple formula: higher score = lower risk)
        float bugRisk = 1 - ((jenkinsScore + sonarScore) / 200.0f);

        // Save to DB
        AnalysisResult result = new AnalysisResult();
        result.setRepo(repo);
        result.setJenkinsScore(jenkinsScore);
        result.setSonarScore(sonarScore);
        result.setBugRiskScore(bugRisk);

        return analysisRepository.save(result);
    }

    /**
     * Extract Sonar score from JSON metrics
     * For simplicity, we calculate: 100 - (bugs*2 + vulnerabilities*3 + code_smells/2)
     */
    private int parseSonarScore(String json) {
        try {
            // Basic string parsing (you can use Jackson ObjectMapper for production)
            int bugs = extractMetric(json, "bugs");
            int vulnerabilities = extractMetric(json, "vulnerabilities");
            int codeSmells = extractMetric(json, "code_smells");

            int score = 100 - (bugs * 2 + vulnerabilities * 3 + codeSmells / 2);
            return Math.max(0, Math.min(score, 100));
        } catch (Exception e) {
            return 70 + random.nextInt(21); // fallback 70-90
        }
    }

    private int extractMetric(String json, String key) {
        String pattern = "\"" + key + "\":";
        int index = json.indexOf(pattern);
        if (index == -1) return 0;

        String substring = json.substring(index + pattern.length());
        String numStr = substring.split("[,}]")[0].trim();
        return Integer.parseInt(numStr);
    }
}
