"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, GitBranch, TrendingDown, TrendingUp, Eye, Trash2 } from "lucide-react"

const historyData = [
  {
    id: 1,
    repo: "vercel/next.js",
    branch: "canary",
    date: "2025-02-10T14:30:00Z",
    jenkinsScore: 85,
    sonarScore: 92,
    bugRiskScore: 23,
    trend: "up",
  },
  {
    id: 2,
    repo: "facebook/react",
    branch: "main",
    date: "2025-02-09T10:15:00Z",
    jenkinsScore: 78,
    sonarScore: 88,
    bugRiskScore: 31,
    trend: "down",
  },
  {
    id: 3,
    repo: "microsoft/typescript",
    branch: "main",
    date: "2025-02-08T16:45:00Z",
    jenkinsScore: 91,
    sonarScore: 95,
    bugRiskScore: 18,
    trend: "up",
  },
  {
    id: 4,
    repo: "nodejs/node",
    branch: "main",
    date: "2025-02-07T09:20:00Z",
    jenkinsScore: 82,
    sonarScore: 87,
    bugRiskScore: 28,
    trend: "up",
  },
  {
    id: 5,
    repo: "vuejs/core",
    branch: "main",
    date: "2025-02-06T13:10:00Z",
    jenkinsScore: 88,
    sonarScore: 90,
    bugRiskScore: 22,
    trend: "down",
  },
]

export function HistoryPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Analysis History</h2>
          <p className="text-muted-foreground mt-1">View and compare past repository scans</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Trash2 className="w-4 h-4" />
          Clear History
        </Button>
      </div>

      <div className="grid gap-4">
        {historyData.map((scan) => (
          <Card key={scan.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{scan.repo}</h3>
                      <p className="text-sm text-muted-foreground">Branch: {scan.branch}</p>
                    </div>
                    {scan.trend === "up" ? (
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Improved
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        Declined
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {formatDate(scan.date)}
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-jenkins-score" style={{ boxShadow: "0 0 8px #FFD700" }} />
                      <span className="text-sm text-muted-foreground">Jenkins:</span>
                      <span className="font-semibold text-jenkins-score">{scan.jenkinsScore}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-sonar-score" style={{ boxShadow: "0 0 8px #1ABC9C" }} />
                      <span className="text-sm text-muted-foreground">Sonar:</span>
                      <span className="font-semibold text-sonar-score">{scan.sonarScore}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-bug-risk" style={{ boxShadow: "0 0 8px #E74C3C" }} />
                      <span className="text-sm text-muted-foreground">Bug Risk:</span>
                      <span className="font-semibold text-bug-risk">{scan.bugRiskScore}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
