"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2, FileCode } from "lucide-react"

interface RiskSummaryProps {
  bugRiskScore: number
  repoUrl: string
}

function generateRiskyModules(repoUrl: string, bugRiskScore: number) {
  const repoHash = repoUrl.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const moduleTemplates = [
    ["Auth Module", "API Gateway", "Database Layer"],
    ["Payment Service", "User Management", "Cache Layer"],
    ["Notification System", "File Upload", "Session Handler"],
    ["Email Service", "Logging Module", "Config Manager"],
    ["Security Layer", "Data Validator", "Queue Processor"],
  ]

  const selectedModules = moduleTemplates[repoHash % moduleTemplates.length]

  return selectedModules.map((name, index) => ({
    name,
    risk: Math.min(50, bugRiskScore + Math.floor((repoHash % 20) + index * 3)),
    files: Math.floor(15 + (repoHash % 15) + index * 5),
  }))
}

export function RiskSummary({ bugRiskScore, repoUrl }: RiskSummaryProps) {
  const riskyModules = generateRiskyModules(repoUrl, bugRiskScore)

  const safeCodePercentage = 100 - bugRiskScore
  const riskyCodePercentage = bugRiskScore

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <FileCode className="w-5 h-5" />
            Code Safety Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Safe Code</p>
                <p className="text-2xl font-bold text-green-500">{safeCodePercentage.toFixed(1)}%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated Files</p>
              <p className="text-xl font-semibold text-foreground">~{Math.floor((safeCodePercentage / 100) * 250)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Risky Code</p>
                <p className="text-2xl font-bold text-red-500">{riskyCodePercentage.toFixed(1)}%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated Files</p>
              <p className="text-xl font-semibold text-foreground">~{Math.floor((riskyCodePercentage / 100) * 250)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-bug-risk" />
            High-Risk Modules
          </CardTitle>
          <p className="text-sm text-muted-foreground">Modules requiring immediate attention</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskyModules.map((module, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background/50 border border-border rounded-lg hover:border-bug-risk/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: module.risk > 40 ? "#FF6B6B" : module.risk > 35 ? "#FF8C42" : "#FFA07A",
                      boxShadow: `0 0 8px ${module.risk > 40 ? "#FF6B6B" : module.risk > 35 ? "#FF8C42" : "#FFA07A"}`,
                    }}
                  />
                  <div>
                    <p className="font-medium text-foreground">{module.name}</p>
                    <p className="text-xs text-muted-foreground">{module.files} files affected</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-bug-risk">{module.risk}</p>
                  <p className="text-xs text-muted-foreground">Risk Score</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
