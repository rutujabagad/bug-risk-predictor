"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface RiskDistributionChartProps {
  bugRiskScore: number
}

export function RiskDistributionChart({ bugRiskScore }: RiskDistributionChartProps) {
  const COLORS = {
    safe: "#22C55E", // Bright green for safe code
    risky: "#EF4444", // Bright red for risky code
  }

  const data = [
    { name: "Safe Code", value: 100 - bugRiskScore, fill: COLORS.safe },
    { name: "Risky Code", value: bugRiskScore, fill: COLORS.risky },
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-zinc-800 border-2 border-zinc-700 rounded-lg p-3 shadow-xl">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">{payload[0].name}</p>
          <p className="text-lg font-bold" style={{ color: payload[0].payload.fill }}>
            {payload[0].value.toFixed(1)}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Risk Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">Code safety breakdown</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="#1E1E1E"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  style={{
                    filter: `drop-shadow(0 0 12px ${entry.fill})`,
                    opacity: 1,
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value, entry: any) => (
                <span style={{ color: entry.payload.fill, fontWeight: 600, fontSize: "14px" }}>
                  {value}: {entry.payload.value.toFixed(1)}%
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
