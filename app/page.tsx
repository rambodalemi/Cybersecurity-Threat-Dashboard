import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Activity, Clock } from "lucide-react"
import { ThreatChart } from "@/components/threat-chart"
import { AlertsTable } from "@/components/alerts-table"
import { ThreatMap } from "@/components/threat-map"
import { getRecentAlerts, getChartData } from "@/lib/data" // updated import to your db file

export default async function Dashboard() {
  const alerts = await getRecentAlerts()
  const chartData = await getChartData()

  // Count critical alerts for badge
  const criticalCount = alerts.filter(a => a.type === "Critical").length

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-2 sm:gap-4 px-3 sm:px-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-semibold truncate">Cybersecurity Threat Dashboard</h1>
            <Badge variant="outline" className="hidden sm:flex text-green-600 border-green-600 text-xs">
              <Activity className="h-3 w-3 mr-1" />
              System Online
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">{criticalCount} Critical</span>
              <span className="sm:hidden">{criticalCount}</span>
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-red-500">{alerts.length}</div>
              <p className="text-xs text-muted-foreground">+{alerts.length} today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Blocked Attacks</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              {/* Since blocked count is not in your alerts, hardcoded or aggregate later */}
              <div className="text-xl sm:text-2xl font-bold text-green-500">2,847</div>
              <p className="text-xs text-muted-foreground">+23% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-blue-500">98.7%</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-yellow-500">1.2s</div>
              <p className="text-xs text-muted-foreground">Average detection time</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Threat Activity (24h)</CardTitle>
              <CardDescription className="text-sm">Real-time threat detection and blocking statistics</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ThreatChart data={chartData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Global Threat Map</CardTitle>
              <CardDescription className="text-sm">Geographic distribution of detected threats</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ThreatMap />
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Recent Security Alerts</CardTitle>
            <CardDescription className="text-sm">Latest security incidents requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="overflow-x-auto">
              <AlertsTable alerts={alerts} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
