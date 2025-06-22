import { alerts } from "@/lib/db";

interface LogEntry {
  ip: string;
  message?: string;
  failedAttempts: number;
}

export async function detectThreats(log: LogEntry) {
  const alertList = [];

  if (["203.0.113.45"].includes(log.ip)) {
    alertList.push({ type: "Blacklisted IP", message: `IP ${log.ip} is blacklisted` });
  }

  if (log.message?.includes("sqlmap")) {
    alertList.push({ type: "Suspicious Message", message: "Detected sqlmap scan" });
  }

  if (log.failedAttempts > 5) {
    alertList.push({ type: "Brute Force", message: "Too many failed attempts" });
  }

  for (const alert of alertList) {
    await alerts.insertOne({ ...alert, timestamp: new Date(), ip: log.ip });
  }

  return alertList;
}
