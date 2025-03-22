"use client"

import * as React from "react"
import { format, isFuture, startOfTomorrow } from "date-fns"
import { ja } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onSelect: (date: Date | undefined) => void
}

export function DatePicker({ date, onSelect }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (newDate: Date | undefined) => {
    onSelect(newDate)
    setOpen(false)
  }

  const tomorrow = startOfTomorrow()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full sm:w-[180px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy年MM月dd日", { locale: ja }) : <span>日付を選択</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          locale={ja}
          disabled={(date) => isFuture(date) || date >= tomorrow}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
