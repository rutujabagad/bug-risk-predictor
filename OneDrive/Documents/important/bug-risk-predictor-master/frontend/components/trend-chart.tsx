"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { date: "Jan 1", jenkins: 78, sonar: 85, bugRisk: 32 },
  { date: "Jan 8", jenkins: 82, sonar: 88, bugRisk: 28 },
  { date: "Jan 15", jenkins: 80, sonar: 90, bugRisk: 25 },
  { date: "Jan 22", jenkins: 85, sonar: 89, bugRisk: 30 },
  { date: "Jan 29", jenkins: 83, sonar: 91, bugRisk: 26 },
  { date: "Feb 5", jenkins: 87, sonar: 92, bugRisk: 24 },
  { date: "Feb 10", jenkins: 85, sonar: 92, bugRisk: 23 },
]

export function TrendChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Historical Trends</CardTitle>
        <p className="text-sm text-muted-foreground">
          Track Jenkins & Sonar scores (higher is better) and Bug Risk (lower is better)
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
            <XAxis
              dataKey="date"
              stroke="oklch(0.65 0 0)"
              style={{ fontSize: "12px" }}
              label={{ value: "Date", position: "insideBottom", offset: -5, fill: "oklch(0.65 0 0)" }}
            />
            <YAxis
              stroke="oklch(0.65 0 0)"
              style={{ fontSize: "12px" }}
              label={{ value: "Score", angle: -90, position: "insideLeft", fill: "oklch(0.65 0 0)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.15 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "8px",
                color: "oklch(0.95 0 0)",
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => {
                if (value === "jenkins") return "Jenkins Score (↑ Better)"
                if (value === "sonar") return "Sonar Score (↑ Better)"
                if (value === "bugRisk") return "Bug Risk (↓ Better)"
                return value
              }}
            />
            <Line
              type="monotone"
              dataKey="jenkins"
              stroke="#FFD700"
              strokeWidth={2}
              dot={{ fill: "#FFD700", r: 4 }}
              name="jenkins"
              style={{ filter: "drop-shadow(0 0 8px #FFD70080)" }}
            />
            <Line
              type="monotone"
              dataKey="sonar"
              stroke="#1ABC9C"
              strokeWidth={2}
              dot={{ fill: "#1ABC9C", r: 4 }}
              name="sonar"
              style={{ filter: "drop-shadow(0 0 8px #1ABC9C80)" }}
            />
            <Line
              type="monotone"
              dataKey="bugRisk"
              stroke="#E74C3C"
              strokeWidth={2}
              dot={{ fill: "#E74C3C", r: 4 }}
              name="bugRisk"
              style={{ filter: "drop-shadow(0 0 8px #E74C3C80)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
