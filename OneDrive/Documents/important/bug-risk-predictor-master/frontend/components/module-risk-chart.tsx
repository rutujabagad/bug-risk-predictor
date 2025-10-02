"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { AlertTriangle } from "lucide-react"

const data = [
  { module: "Auth Module", risk: 45, color: "#FF6B6B" },
  { module: "API Gateway", risk: 38, color: "#FF8C42" },
  { module: "Database Layer", risk: 32, color: "#FFA07A" },
]

export function ModuleRiskChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">High-Risk Modules Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">Modules requiring immediate attention (Risk Score {">"} 30)</p>
          </div>
          <div className="flex items-center gap-2 text-bug-risk">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">{data.length} Critical</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
            <XAxis
              dataKey="module"
              stroke="oklch(0.65 0 0)"
              style={{ fontSize: "12px" }}
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="oklch(0.65 0 0)"
              style={{ fontSize: "12px" }}
              label={{ value: "Risk Score", angle: -90, position: "insideLeft", fill: "oklch(0.65 0 0)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.15 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "8px",
                color: "oklch(0.95 0 0)",
              }}
              formatter={(value: number) => [`Risk Score: ${value}`, ""]}
            />
            <Bar dataKey="risk" radius={[8, 8, 0, 0]} name="Risk Score">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{ filter: `drop-shadow(0 0 12px ${entry.color}CC)` }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
