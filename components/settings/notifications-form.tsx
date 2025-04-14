"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function NotificationsForm() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Notification preferences updated")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="goal-alerts">Goal Alerts</Label>
              <Switch id="goal-alerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="expense-alerts">Large Expense Alerts</Label>
              <Switch id="expense-alerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="monthly-summary">Monthly Summary</Label>
              <Switch id="monthly-summary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="tax-reminders">Tax Payment Reminders</Label>
              <Switch id="tax-reminders" defaultChecked />
            </div>
          </div>

          <Button type="submit">Save Preferences</Button>
        </form>
      </CardContent>
    </Card>
  )
}