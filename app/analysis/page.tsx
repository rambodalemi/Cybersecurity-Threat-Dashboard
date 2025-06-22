import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Target, Zap } from "lucide-react"
import { ThreatAnalysisChart } from "@/components/threat-analysis-chart"

export default function AnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <h1 className="text-xl font-semibold">Threat Analysis</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        {/* Analysis Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threat Vectors</CardTitle>
              <Target className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Active attack vectors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">7.8</div>
              <p className="text-xs text-muted-foreground">Out of 10 (High Risk)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attack Patterns</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Identified patterns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">94.2%</div>
              <p className="text-xs text-muted-foreground">ML model accuracy</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Threat Categories</CardTitle>
              <CardDescription>Distribution of threat types over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ThreatAnalysisChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attack Timeline</CardTitle>
              <CardDescription>Chronological view of security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "14:32", type: "DDoS Attack", severity: "Critical", status: "Mitigated" },
                  { time: "13:45", type: "Malware Detection", severity: "High", status: "Quarantined" },
                  { time: "12:18", type: "Suspicious Login", severity: "Medium", status: "Monitoring" },
                  { time: "11:02", type: "Port Scan", severity: "Low", status: "Blocked" },
                ].map((incident, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-mono text-muted-foreground">{incident.time}</div>
                      <div className="text-sm font-medium">{incident.type}</div>
                      <Badge
                        variant={
                          incident.severity === "Critical"
                            ? "destructive"
                            : incident.severity === "High"
                              ? "destructive"
                              : incident.severity === "Medium"
                                ? "default"
                                : "secondary"
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                    <Badge variant="outline">{incident.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Threat Intelligence */}
        <Card>
          <CardHeader>
            <CardTitle>Threat Intelligence Summary</CardTitle>
            <CardDescription>AI-powered analysis of current threat landscape</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">Top Threats</h4>
                <div className="space-y-2">
                  {[
                    { name: "Ransomware Variants", risk: "Critical", trend: "↑" },
                    { name: "Supply Chain Attacks", risk: "High", trend: "↑" },
                    { name: "Zero-day Exploits", risk: "High", trend: "→" },
                    { name: "Social Engineering", risk: "Medium", trend: "↓" },
                  ].map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/30">
                      <span className="text-sm">{threat.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            threat.risk === "Critical"
                              ? "destructive"
                              : threat.risk === "High"
                                ? "destructive"
                                : "default"
                          }
                        >
                          {threat.risk}
                        </Badge>
                        <span className="text-sm">{threat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Recommendations</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20">
                    • Update firewall rules to block suspicious IP ranges
                  </div>
                  <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                    • Increase monitoring on critical infrastructure
                  </div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
                    • Deploy additional endpoint protection
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
