package com.analyzer.controller;

import com.analyzer.model.AnalysisResult;
import com.analyzer.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    @Autowired
    private AnalysisService analysisService;

    /**
     * Trigger analysis for a repository
     */
    @PostMapping("/run")
    public AnalysisResult runAnalysis(
            @RequestParam String repoUrl,
            @RequestParam String jenkinsJobName,
            @RequestParam String sonarProjectKey) {

        return analysisService.analyzeRepo(repoUrl, jenkinsJobName, sonarProjectKey);
    }
}
