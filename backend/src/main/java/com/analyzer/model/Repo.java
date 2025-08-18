package com.analyzer.model;

import jakarta.persistence.*;

@Entity
public class Repo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String repoUrl;
    private String branch;

    // Getters and setters
}
