package com.analyzer.controller;

import com.analyzer.model.AnalysisResult;
import com.analyzer.service.AnalysisService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @PostMapping("/run/{repoId}")
    public AnalysisResult analyzeRepo(@PathVariable Long repoId) {
        return analysisService.analyzeRepo(repoId);
    }
}
