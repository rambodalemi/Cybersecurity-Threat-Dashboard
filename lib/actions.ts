export async function sendTestAlert(email: string) {
  const res = await fetch("/api/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ip: "203.0.113.99",
      message: "sqlmap test on login.php",
      failedAttempts: 10,
      receiver: email // optionally use this inside sendAlertEmail
    })
  })

  if (!res.ok) throw new Error("Failed to send test alert")

  return await res.json()
}
