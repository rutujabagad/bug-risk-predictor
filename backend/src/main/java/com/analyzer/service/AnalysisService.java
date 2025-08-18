package com.analyzer.service;

import com.analyzer.model.AnalysisResult;
import com.analyzer.model.Repo;
import com.analyzer.repository.AnalysisRepository;
import com.analyzer.repository.RepoRepository;
import org.springframework.stereotype.Service;

@Service
public class AnalysisService {
    private final RepoRepository repoRepository;
    private final AnalysisRepository analysisRepository;

    public AnalysisService(RepoRepository repoRepository, AnalysisRepository analysisRepository) {
        this.repoRepository = repoRepository;
        this.analysisRepository = analysisRepository;
    }

    public AnalysisResult analyzeRepo(Long repoId) {
        Repo repo = repoRepository.findById(repoId)
                .orElseThrow(() -> new RuntimeException("Repo not found"));

        // 🔹 Step 1: Trigger Jenkins job for CI/CD pipeline
        int jenkinsScore = triggerJenkinsPipeline(repo);

        // 🔹 Step 2: Fetch SonarQube quality score
        int sonarScore = fetchSonarMetrics(repo);

        // 🔹 Step 3: Run ML model to predict bug-proneness
        double bugRiskScore = predictBugRisk(repo);

        // Save result
        AnalysisResult result = new AnalysisResult(repo, jenkinsScore, sonarScore, bugRiskScore);
        return analysisRepository.save(result);
    }

    private int triggerJenkinsPipeline(Repo repo) {
        // Call Jenkins API (stub for now)
        return 85; 
    }

    private int fetchSonarMetrics(Repo repo) {
        // Call SonarQube API (stub for now)
        return 92;
    }

    private double predictBugRisk(Repo repo) {
        // ML prediction logic (stub for now, can integrate Python model)
        return Math.random(); // random risk score
    }
}
