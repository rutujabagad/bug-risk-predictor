package com.analyzer.repository;

import com.analyzer.model.Repo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoRepository extends JpaRepository<Repo, Long> {}
