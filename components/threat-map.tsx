"use client"
import { Badge } from "@/components/ui/badge"

export function ThreatMap() {
  const threats = [
    { country: "United States", count: 45, severity: "High" },
    { country: "China", count: 32, severity: "Critical" },
    { country: "Russia", count: 28, severity: "High" },
    { country: "North Korea", count: 15, severity: "Medium" },
    { country: "Iran", count: 12, severity: "Medium" },
    { country: "Brazil", count: 8, severity: "Low" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative h-[150px] sm:h-[200px] bg-slate-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground px-4">
          <div className="text-sm mb-2">Global Threat Distribution</div>
          <div className="text-xs">Interactive map visualization would be here</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Top Threat Sources</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {threats.map((threat) => (
            <div key={threat.country} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-sm font-medium truncate">{threat.country}</span>
                <Badge variant={getSeverityColor(threat.severity)} className="text-xs shrink-0">
                  {threat.severity}
                </Badge>
              </div>
              <span className="text-sm font-mono shrink-0">{threat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
