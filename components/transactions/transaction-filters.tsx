"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockCategories, mockSources, mockBusinesses } from "@/lib/mock-data"
import { TransactionFilters } from "@/lib/types"
import { format } from "date-fns"

interface TransactionFiltersProps {
  filters: TransactionFilters
  onChange: (filters: TransactionFilters) => void
  onReset: () => void
}

export function TransactionFilters({ filters, onChange, onReset }: TransactionFiltersProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Select
        value={filters.business}
        onValueChange={(value) => onChange({ ...filters, business: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Businesses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Businesses</SelectItem>
          {mockBusinesses.map((business) => (
            <SelectItem key={business} value={business.toLowerCase()}>
              {business}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.type}
        onValueChange={(value) => onChange({ ...filters, type: value })}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.category}
        onValueChange={(value) => onChange({ ...filters, category: value })}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {mockCategories.map((category) => (
            <SelectItem key={category} value={category.toLowerCase()}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.source}
        onValueChange={(value) => onChange({ ...filters, source: value })}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="All Sources" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {mockSources.map((source) => (
            <SelectItem key={source} value={source.toLowerCase()}>
              {source}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.dateRange.from ? (
              filters.dateRange.to ? (
                <>
                  {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                  {format(filters.dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(filters.dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={filters.dateRange.from}
            selected={{
              from: filters.dateRange.from,
              to: filters.dateRange.to,
            }}
            onSelect={(range) => {
              onChange({
                ...filters,
                dateRange: {
                  from: range?.from,
                  to: range?.to,
                },
              })
              setIsDatePickerOpen(false)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="rounded-full"
        title="Reset filters"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}