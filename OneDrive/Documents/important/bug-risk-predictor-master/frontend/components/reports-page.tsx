"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, FileSpreadsheet, FileJson, Calendar } from "lucide-react"

interface ReportsPageProps {
  repoData: {
    url: string
    branch: string
    lastScan: string
    jenkinsScore: number
    sonarScore: number
    bugRiskScore: number
  }
}

export function ReportsPage({ repoData }: ReportsPageProps) {
  const reportTypes = [
    {
      name: "Executive Summary",
      description: "High-level overview of code health metrics",
      icon: FileText,
      format: "PDF",
      color: "text-red-500",
    },
    {
      name: "Detailed Analysis",
      description: "In-depth breakdown of all modules and risk factors",
      icon: FileText,
      format: "PDF",
      color: "text-blue-500",
    },
    {
      name: "CSV Export",
      description: "Raw data export for custom analysis",
      icon: FileSpreadsheet,
      format: "CSV",
      color: "text-green-500",
    },
    {
      name: "JSON Data",
      description: "Machine-readable format for integrations",
      icon: FileJson,
      format: "JSON",
      color: "text-purple-500",
    },
  ]

  const scheduledReports = [
    { frequency: "Daily", time: "09:00 AM", enabled: true },
    { frequency: "Weekly", time: "Monday 09:00 AM", enabled: true },
    { frequency: "Monthly", time: "1st of month 09:00 AM", enabled: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground mt-1">Generate and download detailed analysis reports</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Current Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Repository: <span className="text-foreground font-medium">{repoData.url}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Branch: <span className="text-foreground font-medium">{repoData.branch}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Last Scan:{" "}
              <span className="text-foreground font-medium">{new Date(repoData.lastScan).toLocaleString()}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Generate Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <report.icon className={`w-8 h-8 ${report.color}`} />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground">{report.name}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <Badge variant="outline" className="mt-2">
                        {report.format}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Scheduled Reports
          </CardTitle>
          <p className="text-sm text-muted-foreground">Automatically generate and email reports</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledReports.map((schedule, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-background/50 border border-border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-2 h-2 rounded-full ${schedule.enabled ? "bg-green-500" : "bg-gray-500"}`}
                    style={{ boxShadow: schedule.enabled ? "0 0 8px #10B981" : "none" }}
                  />
                  <div>
                    <p className="font-medium text-foreground">{schedule.frequency} Report</p>
                    <p className="text-sm text-muted-foreground">{schedule.time}</p>
                  </div>
                </div>
                <Button variant={schedule.enabled ? "default" : "outline"} size="sm">
                  {schedule.enabled ? "Enabled" : "Disabled"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
