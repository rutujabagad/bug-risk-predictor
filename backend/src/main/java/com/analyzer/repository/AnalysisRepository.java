package com.analyzer.repository;

import com.analyzer.model.AnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalysisRepository extends JpaRepository<AnalysisResult, Long> {}
