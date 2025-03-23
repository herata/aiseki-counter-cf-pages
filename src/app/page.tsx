"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVisitorData } from "@/hook/use-visitor-data";
import { getStoresByPrefecture } from "@/lib/stores";
import { format, subDays } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useStoredState } from "@/hook/use-stored-state";
import { LocationSelect } from "@/components/LocationSelect/LocationSelect";
import { VisitorChart } from "@/components/VisitorChart/VisitorChart";
import { useChartData } from "@/hooks/useChartData";
import type { VisitorData } from "@/types/visitor";

const getDefaultDate = () => {
  const now = new Date();
  const hour = now.getHours();
  return hour < 18 ? subDays(now, 1) : now;
};

export default function Home() {
  const [date, setDate] = useState<Date>(getDefaultDate());
  const [prefecture, setPrefecture] = useStoredState<string>("selectedPrefecture", null);
  const [shop, setShop] = useStoredState<string>("selectedShop", null);

  // Get available stores for selected prefecture
  const stores = useMemo(
    () => (prefecture ? getStoresByPrefecture(prefecture) : []),
    [prefecture],
  );

  // Initialize and validate shop selection
  useEffect(() => {
    const validateShop = () => {
      if (!shop) return;
      if (!prefecture) {
        setShop(null);
        return;
      }
      const isValidShop = stores.some(store => store.id === shop);
      if (!isValidShop) {
        console.debug('Shop not found in current prefecture, clearing selection');
        setShop(null);
      }
    };

    validateShop();
  }, [prefecture, shop, stores, setShop]);

  // Fetch visitor data
  const { data, comparisonData, isLoading, error } = useVisitorData({
    shop: shop ?? "",
    date: format(date, "yyyy-MM-dd"),
  });

  // Process chart data
  const chartData = useChartData(
    date,
    (data ?? null) as VisitorData | null,
    (comparisonData ?? null) as VisitorData | null
  );

  return (
    <div className="flex flex-col container mx-auto items-center gap-3 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>相席カウンター</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <LocationSelect
            prefecture={prefecture}
            onPrefectureChange={setPrefecture}
            shop={shop}
            onShopChange={setShop}
            stores={stores}
            date={date}
            onDateChange={setDate}
          />
          <VisitorChart
            data={chartData}
            isLoading={isLoading}
            error={error}
            showChart={!!shop}
          />
        </CardContent>
      </Card>
    </div>
  );
}
