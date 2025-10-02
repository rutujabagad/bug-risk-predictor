const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getJenkinsJob(jobName: string) {
  const res = await fetch(`${API_BASE}/api/analyze/jenkins/${jobName}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Jenkins data");
  return res.json();
}

export async function getSonarAnalysis(projectKey: string) {
  const res = await fetch(`${API_BASE}/api/analyze/sonar/${projectKey}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Sonar data");
  return res.json();
}
