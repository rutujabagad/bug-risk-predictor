package com.analyzer.service;

import com.analyzer.model.Repo;
import com.analyzer.repository.RepoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RepoService {
    private final RepoRepository repoRepository;

    public RepoService(RepoRepository repoRepository) {
        this.repoRepository = repoRepository;
    }

    public Repo addRepo(Repo repo) {
        return repoRepository.save(repo);
    }

    public List<Repo> getAllRepos() {
        return repoRepository.findAll();
    }
}
