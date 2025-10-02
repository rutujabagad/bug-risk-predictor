"use client"

interface CircularProgressProps {
  value: number
  color: "jenkins" | "sonar" | "bug-risk"
  inverted?: boolean
}

export function CircularProgress({ value, color, inverted = false }: CircularProgressProps) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  const colorMap = {
    jenkins: "#FFD700",
    sonar: "#1ABC9C",
    "bug-risk": "#E74C3C",
  }

  return (
    <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
      <div
        className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, ${colorMap[color]}40, ${colorMap[color]})`,
          boxShadow: `0 0 20px ${colorMap[color]}60`,
        }}
      />
    </div>
  )
}
