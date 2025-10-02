package com.analyzer.controller;

import com.analyzer.model.Repo;
import com.analyzer.service.RepoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/repos")
public class RepoController {

    private final RepoService repoService;

    public RepoController(RepoService repoService) {
        this.repoService = repoService;
    }

    @PostMapping("/add")
    public Repo addRepo(@RequestBody Repo repo) {
        return repoService.addRepo(repo);
    }

    @GetMapping
    public List<Repo> getAllRepos() {
        return repoService.getAllRepos();
    }
}
