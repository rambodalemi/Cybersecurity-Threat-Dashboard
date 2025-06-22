import { alerts } from "@/lib/db"

type ChartData = {
  time: string
  threats: number
  blocked: number
}

interface Alert{
  id: string
  timestamp: string
  type: string
  message: string
  ip: string
}


export async function getRecentAlerts(): Promise<Alert[]> {
  const raw = await alerts.find().sort({ timestamp: -1 }).limit(100).toArray()

  return raw.map((doc) => ({
    id: doc._id.toString(),
    type: doc.type,
    message: doc.message,
    timestamp: doc.timestamp,
    ip: doc.ip,
  }))
}



export async function getChartData(): Promise<ChartData[]> {
  const raw = await alerts
    .find({}, { projection: { timestamp: 1 } })
    .sort({ timestamp: -1 })
    .limit(100)
    .toArray()

  // For demo: count 1 threat, 1 blocked each
  return raw.map((item) => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    threats: 1,
    blocked: 1,
  }))
}

