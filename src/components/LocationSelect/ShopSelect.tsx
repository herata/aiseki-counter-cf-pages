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
  const formatShopLabel = (store: Store) => {
    return `${store.name} ${store.location}`;
  };

  const selectedStore = stores.find(store => store.id === value);

  return (
    <Select
      value={value ?? ""}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="h-9 w-full bg-white border-slate-200">
        <SelectValue placeholder="店舗">
          {selectedStore && formatShopLabel(selectedStore)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {stores.map((store) => (
          <SelectItem
            key={store.id}
            value={store.id}
            className="font-normal"
          >
            {formatShopLabel(store)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}