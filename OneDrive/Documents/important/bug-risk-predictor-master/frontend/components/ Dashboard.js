import React, { useState } from "react";
import RepoUpload from "./RepoUpload";
import RiskChart from "./RiskChart";

const Dashboard = () => {
  const [result, setResult] = useState(null);

  return (
    <div>
      <h1>Code Health & Bug Risk Analyzer</h1>
      <RepoUpload onResult={setResult} />

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Analysis Result</h2>
          <p>Repo URL: {result.repo.repoUrl}</p>
          <p>Jenkins Score: {result.jenkinsScore}</p>
          <p>Sonar Score: {result.sonarScore}</p>
          <p>Bug Risk Score: {result.bugRiskScore.toFixed(2)}</p>
          <RiskChart bugRisk={result.bugRiskScore} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
