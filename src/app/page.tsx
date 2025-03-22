"use client";

import { DatePicker } from "@/components/datepicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useVisitorData } from "@/hook/use-visitor-data";
import { getStoresByPrefecture, prefectures } from "@/lib/stores";
import { format, subDays } from "date-fns";
import { ja } from "date-fns/locale";
import { useMemo, useState } from "react";
import { useStoredState } from "@/hook/use-stored-state";
import {
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts";

const getDefaultDate = () => {
	const now = new Date();
	const hour = now.getHours();
	return hour < 18 ? subDays(now, 1) : now;
};

export default function Home() {
	const [prefecture, setPrefecture] = useStoredState<string>("selectedPrefecture");
	const [shop, setShop] = useStoredState<string>("selectedShop");
	const [date, setDate] = useState<Date>(getDefaultDate());
	
	const stores = useMemo(
	() => (prefecture ? getStoresByPrefecture(prefecture) : []),
	[prefecture],
	);
	
	const { data, comparisonData, isLoading, error } = useVisitorData({
	shop: shop ?? "",
	date: format(date, "yyyy-MM-dd"),
	});
	
	const chartData = useMemo(() => {
	if (!data || !comparisonData) return [];
	
	// Set the base time to 18:00
		const baseDate = new Date(date);
		baseDate.setHours(18, 0, 0, 0);
		
		// Set reference time range (18:00 to 2:50 next day)
		const startTime = new Date(date);
		startTime.setHours(18, 0, 0, 0);
		const endTime = new Date(date);
		endTime.setDate(endTime.getDate() + 1);
		endTime.setHours(2, 50, 0, 0);

		// Sort data by timestamp
		const sortedData = [...data.data].sort((a, b) => a.timestamp - b.timestamp);
		const sortedComparisonData = [...comparisonData.data].sort((a, b) => a.timestamp - b.timestamp);

		// Group data by time slot
		const dataByHour = new Map();
		const comparisonByHour = new Map();

		for (const item of sortedData) {
		  const date = new Date(item.timestamp * 1000);
		  const timeKey = format(date, "HH:mm");
		  if (!dataByHour.has(timeKey)) {
		    dataByHour.set(timeKey, item);
		  }
		}

		for (const item of sortedComparisonData) {
		  const date = new Date(item.timestamp * 1000);
		  const timeKey = format(date, "HH:mm");
		  if (!comparisonByHour.has(timeKey)) {
		    comparisonByHour.set(timeKey, item);
		  }
		}

		// Generate data points at 30-minute intervals
		const timePoints = [];
		let current = new Date(startTime);
		const slotInterval = 30 * 60 * 1000; // 30 minutes
		
		while (current <= endTime) {
		  const hour = current.getHours();
		  
		  // Process only within the 18:00-2:50 range
		  if (hour >= 18 || hour < 3) {
		    const timeKey = format(current, "HH:mm", { locale: ja });
		    const currentData = dataByHour.get(timeKey);
		    const comparisonData = comparisonByHour.get(timeKey);

		    timePoints.push({
		      timestamp: current,
		      time: timeKey,
		      hour: hour,
		      male: currentData?.male,
		      female: currentData?.female,
		      prevMale: comparisonData?.male,
		      prevFemale: comparisonData?.female,
		    });
		  }

		  current = new Date(current.getTime() + slotInterval);
		}

		return timePoints;
	}, [data, comparisonData, date]);

	const chartConfig = {
		male: { color: "#2563eb", label: "男性" },
		female: { color: "#db2777", label: "女性" },
		prevMale: { color: "#2563eb", label: "先週の男性" },
		prevFemale: { color: "#db2777", label: "先週の女性" },
	} satisfies ChartConfig;

	return (
		<div className="flex flex-col container mx-auto items-center gap-3 p-4">
			<Card className="w-full max-w-4xl">
				<CardHeader>
					<CardTitle>相席カウンター</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex flex-col sm:flex-row gap-4">
						<Select value={prefecture || ""} onValueChange={setPrefecture}>
							<SelectTrigger className="w-full sm:w-[180px]">
								<SelectValue placeholder="都道府県を選択" />
							</SelectTrigger>
							<SelectContent>
								{prefectures.map((pref) => (
									<SelectItem key={pref} value={pref}>
										{pref}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select
						value={shop ?? ""}
						onValueChange={setShop}
						disabled={!prefecture}
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

						<DatePicker
							date={date}
							onSelect={(newDate) => newDate && setDate(newDate)}
						/>
					</div>

					<div className="min-h-100 w-full">
						{!shop && (
							<div className="min-h-100 flex items-center justify-center text-muted-foreground">
								店舗を選択してください
							</div>
						)}

						{shop && isLoading && (
							<div className="min-h-100 flex items-center justify-center text-muted-foreground">
								データを取得中...
							</div>
						)}

						{shop && error && (
							<div className="min-h-100 flex items-center justify-center text-destructive">
								エラーが発生しました: {error.message}
							</div>
						)}

						{shop && !isLoading && !error && chartData.length > 0 && (
							<ChartContainer config={chartConfig} className="min-h-100 w-full">
								<LineChart
									data={chartData}
									margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
								>
									<CartesianGrid strokeDasharray="3 3" opacity={0.3} />
									<XAxis
									dataKey="time"
									tick={{ fill: "#666" }}
									tickMargin={8}
									interval="preserveStartEnd"
									minTickGap={30}
									domain={["18:00", "02:50"]}
									/>
									<YAxis
										tick={{ fill: "#666" }}
										tickMargin={8}
										allowDecimals={false}
										domain={[0, "auto"]}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<Line
										type="monotone"
										dataKey="male"
										stroke="#2563eb"
										strokeWidth={2}
										dot={false}
										name="男性"
									/>
									<Line
										type="monotone"
										dataKey="female"
										stroke="#db2777"
										strokeWidth={2}
										dot={false}
										name="女性"
									/>
									<Line
										type="monotone"
										dataKey="prevMale"
										stroke="#2563eb"
										strokeWidth={2}
										strokeDasharray="5 5"
										dot={false}
										name="先週の男性"
									/>
									<Line
										type="monotone"
										dataKey="prevFemale"
										stroke="#db2777"
										strokeWidth={2}
										strokeDasharray="5 5"
										dot={false}
										name="先週の女性"
									/>
								</LineChart>
							</ChartContainer>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
