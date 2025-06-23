import { logs } from "@/lib/db"
import { detectThreats } from "@/detectors/simpleDetector"
import { sendAlertEmail } from "@/lib/notify"

export async function POST(req: Request) {
  const log = await req.json()

  await logs.insertOne({ ...log, timestamp: new Date() })

  const alerts = await detectThreats(log)

  if (alerts.length > 0) {
    const text = alerts.map((a) => `${a.type}: ${a.message}`).join("\n")
    const subject = log.emailSubject || "Threat Detected"
    await sendAlertEmail(subject, text, log.receiver)
  }

  return Response.json({ success: true, alerts })
}