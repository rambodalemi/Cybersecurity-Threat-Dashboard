import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Search, Filter, Download } from "lucide-react"
import { AlertsTable } from "@/components/alerts-table"

// Extended mock data for alerts page
const allAlerts = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    type: "Malware",
    severity: "High",
    source: "192.168.1.100",
    status: "Active",
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 300000).toISOString(),
    type: "Phishing",
    severity: "Medium",
    source: "External",
    status: "Investigating",
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 600000).toISOString(),
    type: "DDoS",
    severity: "Critical",
    source: "Multiple",
    status: "Mitigated",
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 900000).toISOString(),
    type: "Intrusion",
    severity: "High",
    source: "192.168.1.50",
    status: "Blocked",
  },
  {
    id: 5,
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    type: "Ransomware",
    severity: "Critical",
    source: "192.168.1.75",
    status: "Contained",
  },
  {
    id: 6,
    timestamp: new Date(Date.now() - 1500000).toISOString(),
    type: "SQL Injection",
    severity: "High",
    source: "203.0.113.45",
    status: "Blocked",
  },
  {
    id: 7,
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    type: "Brute Force",
    severity: "Medium",
    source: "198.51.100.23",
    status: "Monitoring",
  },
  {
    id: 8,
    timestamp: new Date(Date.now() - 2100000).toISOString(),
    type: "Suspicious Activity",
    severity: "Low",
    source: "192.168.1.200",
    status: "Resolved",
  },
]

export default function AlertsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center gap-4 px-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h1 className="text-xl font-semibold">Security Alerts</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-6">
        {/* Alert Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allAlerts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {allAlerts.filter((a) => a.severity === "Critical").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {allAlerts.filter((a) => a.severity === "High").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {allAlerts.filter((a) => a.status === "Active" || a.status === "Investigating").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Management</CardTitle>
            <CardDescription>Monitor and manage all security alerts across your infrastructure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search alerts..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <AlertsTable alerts={allAlerts} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
