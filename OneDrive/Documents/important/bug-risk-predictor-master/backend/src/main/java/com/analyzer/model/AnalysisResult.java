package com.analyzer.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float bugRiskScore;
    private int jenkinsScore;
    private int sonarScore;

    private LocalDateTime timestamp;

    @ManyToOne
    private Repo repo;
}
