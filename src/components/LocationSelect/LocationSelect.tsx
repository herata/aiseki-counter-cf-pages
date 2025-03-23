import { DatePicker } from "@/components/datepicker";
import type { Store } from "@/lib/stores";
import { PrefectureSelect } from "./PrefectureSelect";
import { ShopSelect } from "./ShopSelect";

interface LocationSelectProps {
  prefecture: string | null;
  onPrefectureChange: (value: string) => void;
  shop: string | null;
  onShopChange: (value: string) => void;
  stores: Store[];
  date: Date;
  onDateChange: (date: Date) => void;
}

export function LocationSelect({
  prefecture,
  onPrefectureChange,
  shop,
  onShopChange,
  stores,
  date,
  onDateChange,
}: LocationSelectProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <PrefectureSelect 
        value={prefecture}
        onValueChange={onPrefectureChange}
      />
      <ShopSelect
        value={shop}
        onValueChange={onShopChange}
        stores={stores}
        disabled={!prefecture}
      />
      <DatePicker
        date={date}
        onSelect={(newDate) => newDate && onDateChange(newDate)}
      />
    </div>
  );
}