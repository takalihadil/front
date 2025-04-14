"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsForm } from "@/components/settings/settings-form"
import { NotificationsForm } from "@/components/settings/notifications-form"
import { ExportData } from "@/components/settings/export-data"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Link href="/settings/transaction-settings">
          <Button variant="outline">
            <Settings2 className="mr-2 h-4 w-4" />
            Transaction Settings
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <SettingsForm />
        <NotificationsForm />
        <ExportData />
      </div>
    </div>
  )
}