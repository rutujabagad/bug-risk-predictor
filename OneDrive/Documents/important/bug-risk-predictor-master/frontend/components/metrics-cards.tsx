"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CircularProgress } from "@/components/circular-progress"
import { Wrench, Shield, Bug } from "lucide-react"

interface MetricsCardsProps {
  jenkinsScore: number
  sonarScore: number
  bugRiskScore: number
}

export function MetricsCards({ jenkinsScore, sonarScore, bugRiskScore }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card border-border hover:border-jenkins/50 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Jenkins Score</p>
              <h3 className="text-3xl font-bold text-jenkins">{jenkinsScore}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-jenkins/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6 text-jenkins" />
            </div>
          </div>
          <CircularProgress value={jenkinsScore} color="jenkins" />
        </CardContent>
      </Card>

      <Card className="bg-card border-border hover:border-sonar/50 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Sonar Score</p>
              <h3 className="text-3xl font-bold text-sonar">{sonarScore}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-sonar/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-sonar" />
            </div>
          </div>
          <CircularProgress value={sonarScore} color="sonar" />
        </CardContent>
      </Card>

      <Card className="bg-card border-border hover:border-bug-risk/50 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Bug Risk Score</p>
              <h3 className="text-3xl font-bold text-bug-risk">{bugRiskScore}</h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-bug-risk/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bug className="w-6 h-6 text-bug-risk" />
            </div>
          </div>
          <CircularProgress value={100 - bugRiskScore} color="bug-risk" inverted />
        </CardContent>
      </Card>
    </div>
  )
}
