
import React, { useState } from 'react'
import { format, isAfter, isEqual } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { DayPicker } from 'react-day-picker'

// Button Component
const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

// Calendar Component
const Calendar = React.forwardRef(({ className, classNames, showOutsideDays = true, ...props }, ref) => (
  <DayPicker
    ref={ref}
    showOutsideDays={showOutsideDays}
    className={cn("p-3 bg-[#E5D3B3] rounded-md", className)} // Ensure bg is solid and rounded
    classNames={{
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      caption: "flex justify-center pt-1 relative items-center",
      caption_label: "text-sm font-medium",
      nav: "space-x-1 flex items-center",
      nav_button: cn(
        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      ),
      nav_button_previous: "absolute left-1",
      nav_button_next: "absolute right-1",
      table: "w-full border-collapse space-y-1",
      head_row: "flex",
      head_cell:
        "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
      row: "flex w-full mt-2",
      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
      day: cn(
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
      ),
      day_selected:
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      day_today: "bg-accent text-accent-foreground",
      day_outside: "text-muted-foreground opacity-50",
      day_disabled: "text-muted-foreground opacity-50",
      day_range_middle:
        "aria-selected:bg-accent aria-selected:text-accent-foreground",
      day_hidden: "invisible",
      ...classNames,
    }}
    components={{
      IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
      IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
    }}
    {...props}
  />
))

// Popover Components
const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-auto rounded-md border bg-[#E5D3B3] p-4 text-popover-foreground shadow-md outline-none", // Updated background color to solid
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

// Main DateRangePicker Component
export default function DateRangePickerComponent({ className }) {
  const [date, setDate] = useState()

  const handleSelect = (selectedDate) => {
    if (!selectedDate) return

    setDate((prev) => {
      if (!prev?.from) {
        return { from: selectedDate, to: undefined }
      } else if (prev.from && !prev.to && (isAfter(selectedDate, prev.from) || isEqual(selectedDate, prev.from))) {
        return { from: prev.from, to: selectedDate }
      } else {
        return { from: selectedDate, to: undefined }
      }
    })
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
