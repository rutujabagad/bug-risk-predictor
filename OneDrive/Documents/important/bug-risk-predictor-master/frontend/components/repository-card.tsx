"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GitBranch, Clock, ExternalLink } from "lucide-react"

interface RepositoryCardProps {
  data: {
    url: string
    branch: string
    lastScan: string
  }
}

export function RepositoryCard({ data }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Repository Information</h2>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ExternalLink className="w-4 h-4" />
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {data.url}
                </a>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <GitBranch className="w-4 h-4" />
                <span>{data.branch}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Last scan: {formatDate(data.lastScan)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
