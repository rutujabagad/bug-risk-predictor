"use client";
import { useState } from "react";
import { getJenkinsJob, getSonarAnalysis } from "@/lib/api";

export default function Dashboard() {
  const [jenkinsData, setJenkinsData] = useState<any>(null);
  const [sonarData, setSonarData] = useState<any>(null);

  const handleFetch = async () => {
    try {
      const jenkins = await getJenkinsJob("my-job");
      const sonar = await getSonarAnalysis("my-project");
      setJenkinsData(jenkins);
      setSonarData(sonar);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={handleFetch}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Run Analysis
      </button>

      {jenkinsData && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-bold">Jenkins Result</h2>
          <pre>{JSON.stringify(jenkinsData, null, 2)}</pre>
        </div>
      )}

      {sonarData && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-bold">SonarQube Result</h2>
          <pre>{JSON.stringify(sonarData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
