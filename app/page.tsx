"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

type FormValues = z.infer<typeof formSchema>

const THREAT_MESSAGES = [
  "sqlmap trying brute force on admin.php",
  "xss attempt in comment field",
  "multiple failed login attempts",
  "unauthorized API access",
  "suspicious file upload detected",
]

export default function TestAlertPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "Threat Detected",
      message: THREAT_MESSAGES[0],
    },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true)
      const res = await fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip: "127.0.0.1",
          message: values.message,
          receiver: values.email,
          emailSubject: values.subject,
        }),
      })

      if (!res.ok) throw new Error("Request failed")

      toast.success("Test alert sent successfully")
    } catch (err) {
      toast.error(`${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Send Test Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver Gmail</FormLabel>
                    <FormControl>
                      <Input placeholder="receiver@example.com" value={field.value ?? ""} onChange={field.onChange} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Threat Detected" value={field.value ?? ""} onChange={field.onChange} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Threat Message</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a threat message" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {THREAT_MESSAGES.map((msg) => (
                          <SelectItem key={msg} value={msg}>
                            {msg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Test Email"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}