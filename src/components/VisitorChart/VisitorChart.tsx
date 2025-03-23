import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";
import type { ChartPoint } from "@/hooks/useChartData";

interface VisitorChartProps {
  data: ChartPoint[];
  isLoading: boolean;
  error: Error | null;
  showChart: boolean;
}

const chartConfig = {
  male: { color: "#2563eb", label: "男性" },
  female: { color: "#db2777", label: "女性" },
  prevMale: { color: "#2563eb80", label: "先週の男性" },
  prevFemale: { color: "#db277780", label: "先週の女性" },
} satisfies ChartConfig;

export function VisitorChart({ data, isLoading, error, showChart }: VisitorChartProps) {
  if (!showChart) {
    return (
      <div className="min-h-100 flex items-center justify-center text-muted-foreground">
        店舗を選択してください
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-100 w-full">
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="time"
          tick={{ fill: "#666" }}
          tickMargin={8}
          interval="preserveStartEnd"
          minTickGap={15}
          domain={["18:00", "02:50"]}
          ticks={data.filter((_, i) => i % 3 === 0).map(d => d.time)}
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
          stroke="#2563eb80"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="先週の男性"
        />
        <Line
          type="monotone"
          dataKey="prevFemale"
          stroke="#db277780"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
          name="先週の女性"
        />
      </LineChart>
    </ChartContainer>
  );
}