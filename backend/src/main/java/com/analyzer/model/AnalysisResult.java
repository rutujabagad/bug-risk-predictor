package com.analyzer.model;

import jakarta.persistence.*;

@Entity
public class AnalysisResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int jenkinsScore;
    private int sonarScore;
    private double bugRiskScore;

    @ManyToOne
    private Repo repo;

    public AnalysisResult() {}

    public AnalysisResult(Repo repo, int jenkinsScore, int sonarScore, double bugRiskScore) {
        this.repo = repo;
        this.jenkinsScore = jenkinsScore;
        this.sonarScore = sonarScore;
        this.bugRiskScore = bugRiskScore;
    }

    // Getters and setters
}
