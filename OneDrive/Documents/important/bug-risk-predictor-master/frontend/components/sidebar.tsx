"use client"

import { LayoutDashboard, History, FileText, Settings, Github, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: History, label: "History" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
]

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-jenkins via-sonar to-bug-risk flex items-center justify-center">
            <Activity className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">Code Health</h1>
            <p className="text-xs text-muted-foreground">Bug Risk Analyzer</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveSection(item.label)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              activeSection === item.label
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-lg"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50",
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Github className="w-4 h-4" />
          <span>Connected to GitHub</span>
        </div>
      </div>
    </aside>
  )
}
