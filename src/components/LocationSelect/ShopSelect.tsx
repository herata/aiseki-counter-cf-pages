import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Store } from "@/lib/stores";

interface ShopSelectProps {
  value: string | null;
  onValueChange: (value: string) => void;
  stores: Store[];
  disabled?: boolean;
}

export function ShopSelect({
  value,
  onValueChange,
  stores,
  disabled = false
}: ShopSelectProps) {
  return (
    <Select
      value={value ?? ""}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="店舗を選択" />
      </SelectTrigger>
      <SelectContent>
        {stores.map((store) => (
          <SelectItem key={store.id} value={store.id}>
            {store.name} ({store.location})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}