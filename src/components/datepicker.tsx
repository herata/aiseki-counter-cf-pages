import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
}

export function DatePicker({ date, onSelect }: DatePickerProps) {
  const disableDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-9 w-full justify-start text-left font-normal bg-white border-slate-200",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "yyyy/MM/dd", { locale: ja }) : "日付を選択"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={disableDate}
          initialFocus
          locale={ja}
        />
      </PopoverContent>
    </Popover>
  );
}
