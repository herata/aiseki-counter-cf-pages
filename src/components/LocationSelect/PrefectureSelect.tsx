import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { prefectures } from "@/lib/stores";

interface PrefectureSelectProps {
  value: string | null;
  onValueChange: (value: string) => void;
}

export function PrefectureSelect({ value, onValueChange }: PrefectureSelectProps) {
  return (
    <Select value={value ?? ""} onValueChange={onValueChange}>
      <SelectTrigger className="h-9 w-full bg-white border-slate-200">
        <SelectValue placeholder="都道府県" />
      </SelectTrigger>
      <SelectContent>
        {prefectures.map((pref) => (
          <SelectItem key={pref} value={pref}>
            {pref}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
