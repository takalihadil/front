"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { toast } from "sonner"

export function ExportData() {
  const handleExport = () => {
    toast.success("Export started. Your file will be ready shortly.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Export Format</label>
          <Select defaultValue="csv">
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date Range</label>
          <Select defaultValue="current">
            <SelectTrigger>
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="last">Last Month</SelectItem>
              <SelectItem value="quarter">Current Quarter</SelectItem>
              <SelectItem value="year">Current Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleExport} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </CardContent>
    </Card>
  )
}