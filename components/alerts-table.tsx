"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type Alert = {
  id: number
  timestamp: string
  type: string
  severity: string
  source: string
  status: string
}

export function AlertsTable({ alerts }: { alerts: Alert[] }) {
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "destructive"
      case "investigating":
        return "default"
      case "mitigated":
        return "secondary"
      case "blocked":
        return "outline"
      case "contained":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] sm:w-auto">Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden sm:table-cell">Severity</TableHead>
            <TableHead className="hidden md:table-cell">Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="font-mono text-xs sm:text-sm">
                <div className="sm:hidden">
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="hidden sm:block">{new Date(alert.timestamp).toLocaleTimeString()}</div>
              </TableCell>
              <TableCell className="font-medium text-sm">
                <div>{alert.type}</div>
                <div className="sm:hidden text-xs text-muted-foreground">
                  <Badge variant={getSeverityColor(alert.severity)} className="text-xs mr-1">
                    {alert.severity}
                  </Badge>
                  <span className="md:hidden font-mono">{alert.source}</span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell font-mono text-sm">{alert.source}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(alert.status)} className="text-xs">
                  {alert.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Investigate</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
