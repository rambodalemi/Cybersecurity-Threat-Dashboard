"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type Alert = {
  id: string
  type: string
  message: string
  timestamp: string
  ip: string
}

export function AlertsTable({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] sm:w-auto">Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden sm:table-cell">Message</TableHead>
            <TableHead className="hidden md:table-cell">IP Address</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell className="font-mono text-xs sm:text-sm">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </TableCell>
              <TableCell className="font-medium text-sm">{alert.type}</TableCell>
              <TableCell className="hidden sm:table-cell text-sm">{alert.message}</TableCell>
              <TableCell className="hidden md:table-cell font-mono text-sm">{alert.ip}</TableCell>
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
