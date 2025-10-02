import React, { useState } from "react";
import { runAnalysis } from "../lib/api";

const RepoUpload = ({ onResult }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [jenkinsJobName, setJenkinsJobName] = useState("");
  const [sonarProjectKey, setSonarProjectKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await runAnalysis(repoUrl, jenkinsJobName, sonarProjectKey);
      onResult(result);
    } catch (err) {
      alert("Failed to run analysis. Check console for errors.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="GitHub Repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Jenkins Job Name"
        value={jenkinsJobName}
        onChange={(e) => setJenkinsJobName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Sonar Project Key"
        value={sonarProjectKey}
        onChange={(e) => setSonarProjectKey(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>
    </form>
  );
};

export default RepoUpload;
