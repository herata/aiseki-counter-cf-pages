"use client";

import { DatePicker } from "@/components/datepicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
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
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useMemo, useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

export default function Home() {
	const [prefecture, setPrefecture] = useState<string | null>(null);
	const [shop, setShop] = useState<string | null>(null);
	const [date, setDate] = useState<Date>(new Date());

	const stores = useMemo(
		() => (prefecture ? getStoresByPrefecture(prefecture) : []),
		[prefecture],
	);

	const { data, comparisonData, isLoading, error } = useVisitorData({
		shop: shop || "",
		date: format(date, "yyyy-MM-dd"),
	});

	const chartData = useMemo(() => {
		if (!data || !comparisonData) return [];

		return data.data
			.map((current, index) => {
				const comparison = comparisonData.data[index];
				const date = new Date(current.timestamp * 1000);

				return {
					timestamp: date,
					time: format(date, "HH:mm", { locale: ja }),
					hour: date.getHours(),
					male: current.male,
					female: current.female,
					prevMale: comparison?.male || 0,
					prevFemale: comparison?.female || 0,
				};
			})
			.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
			.filter((item) => item.hour >= 18 || item.hour < 4);
	}, [data, comparisonData]);

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
							value={shop || ""}
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

					<div className="h-[600px] sm:h-[400px] w-full">
						{!shop && (
							<div className="h-full flex items-center justify-center text-muted-foreground">
								店舗を選択してください
							</div>
						)}

						{shop && isLoading && (
							<div className="h-full flex items-center justify-center text-muted-foreground">
								データを取得中...
							</div>
						)}

						{shop && error && (
							<div className="h-full flex items-center justify-center text-destructive">
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
									/>
									<YAxis
										tick={{ fill: "#666" }}
										tickMargin={8}
										allowDecimals={false}
										domain={[0, "auto"]}
									/>
									<ChartTooltip content={<ChartTooltipContent />} />
									<ChartLegend content={<ChartLegendContent />} />
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
