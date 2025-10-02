"use client"

import { Search, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavbarProps {
  repoUrl: string
  setRepoUrl: (url: string) => void
  onAnalyze: () => void
  analyzing: boolean
}

export function Navbar({ repoUrl, setRepoUrl, onAnalyze, analyzing }: NavbarProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Enter GitHub repository URL..."
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAnalyze()}
            className="pl-10 bg-background border-border"
          />
        </div>
        <Button
          onClick={onAnalyze}
          disabled={analyzing || !repoUrl}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {analyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-bug-risk rounded-full" />
        </button>
        <Avatar className="w-8 h-8 border-2 border-border">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
