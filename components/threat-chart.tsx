"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

type ChartData = {
  time: string
  threats: number
  blocked: number
}

export function ThreatChart({ data }: { data: ChartData[] }) {
  return (
    <ChartContainer
      config={{
        threats: {
          label: "Threats Detected",
          color: "hsl(0, 84%, 60%)",
        },
        blocked: {
          label: "Threats Blocked",
          color: "hsl(142, 76%, 36%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="time" className="text-xs" tick={{ fontSize: 12 }} />
          <YAxis className="text-xs" tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="var(--color-threats)"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Threats Detected"
          />
          <Line
            type="monotone"
            dataKey="blocked"
            stroke="var(--color-blocked)"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Threats Blocked"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
