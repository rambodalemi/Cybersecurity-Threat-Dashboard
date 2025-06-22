"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Malware", value: 35, color: "#ef4444" },
  { name: "Phishing", value: 25, color: "#f97316" },
  { name: "DDoS", value: 20, color: "#eab308" },
  { name: "Intrusion", value: 15, color: "#3b82f6" },
  { name: "Other", value: 5, color: "#6b7280" },
]

export function ThreatAnalysisChart() {
  return (
    <div className="space-y-4">
      <ChartContainer
        config={{
          threats: {
            label: "Threat Distribution",
          },
        }}
        className="h-[250px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
            <span className="ml-auto font-mono">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
