"use client"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

type Alert = {
  timestamp: string
  type: string
}

export default function ThreatChart({ data }: { data: Alert[] }) {
  const formatted = data.map((item, i) => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    value: i + 1, // or group/count alerts here
  }))

  return (
    <ChartContainer
      config={{
        alerts: {
          label: "Threats Over Time",
          color: "hsl(0, 100%, 50%)", // red
        },
      }}
      className="w-full aspect-video"
    >
      <LineChart data={formatted}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend />
        <Line
          type="monotone"
          dataKey="value"
          name="alerts"
          stroke="var(--color-alerts)"
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  )
}
