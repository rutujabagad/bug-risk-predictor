"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { RepositoryCard } from "@/components/repository-card"
import { MetricsCards } from "@/components/metrics-cards"
import { TrendChart } from "@/components/trend-chart"
import { RiskDistributionChart } from "@/components/risk-distribution-chart"
import { RiskSummary } from "@/components/risk-summary"
import { HistoryPage } from "@/components/history-page"
import { ReportsPage } from "@/components/reports-page"
import { SettingsPage } from "@/components/settings-page"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("Dashboard")
  const [repoUrl, setRepoUrl] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [repoData, setRepoData] = useState({
    url: "https://github.com/vercel/next.js",
    branch: "canary",
    lastScan: "2025-02-10T14:30:00Z",
    jenkinsScore: 85,
    sonarScore: 92,
    bugRiskScore: 23,
  })

  const handleAnalyze = () => {
    if (!repoUrl) return
    setAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setRepoData({
        url: repoUrl,
        branch: "main",
        lastScan: new Date().toISOString(),
        jenkinsScore: Math.floor(Math.random() * 30) + 70,
        sonarScore: Math.floor(Math.random() * 30) + 70,
        bugRiskScore: Math.floor(Math.random() * 40) + 10,
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar repoUrl={repoUrl} setRepoUrl={setRepoUrl} onAnalyze={handleAnalyze} analyzing={analyzing} />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeSection === "Dashboard" && (
            <>
              <RepositoryCard data={repoData} />

              <MetricsCards
                jenkinsScore={repoData.jenkinsScore}
                sonarScore={repoData.sonarScore}
                bugRiskScore={repoData.bugRiskScore}
              />

              <RiskSummary bugRiskScore={repoData.bugRiskScore} repoUrl={repoData.url} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TrendChart />
                <RiskDistributionChart bugRiskScore={repoData.bugRiskScore} />
              </div>
            </>
          )}

          {activeSection === "History" && <HistoryPage />}

          {activeSection === "Reports" && <ReportsPage repoData={repoData} />}

          {activeSection === "Settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  )
}
