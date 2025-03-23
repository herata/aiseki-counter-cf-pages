import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { VisitorData } from "@/types/visitor";

export type ChartPoint = {
  timestamp: Date;
  time: string;
  hour: number;
  male?: number;
  female?: number;
  prevMale?: number;
  prevFemale?: number;
};

export function useChartData(
  date: Date,
  data: VisitorData | null,
  comparisonData: VisitorData | null
): ChartPoint[] {
  if (!data || !comparisonData) return [];

  // Set reference time range (18:00 to 2:50 next day)
  const startTime = new Date(date);
  startTime.setHours(18, 0, 0, 0);
  const endTime = new Date(date);
  endTime.setDate(endTime.getDate() + 1);
  endTime.setHours(2, 50, 0, 0);

  // Helper function to normalize time for comparison
  const getTimeMinutes = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    if (hours < 4) {
      hours += 24;
    }
    return hours * 60 + date.getMinutes();
  };

  // Sort data by timestamp
  const sortedData = [...data.data].sort((a, b) => a.timestamp - b.timestamp);
  const sortedComparisonData = [...comparisonData.data].sort((a, b) => a.timestamp - b.timestamp);

  // Generate data points at 10-minute intervals
  const timePoints: ChartPoint[] = [];
  let current = new Date(startTime);
  const slotInterval = 10 * 60 * 1000; // 10 minutes

  while (current <= endTime) {
    const hour = current.getHours();
    
    if (hour >= 18 || hour < 3) {
      const currentMinutes = getTimeMinutes(current.getTime() / 1000);
      
      const currentData = sortedData.find(item => {
        const itemMinutes = getTimeMinutes(item.timestamp);
        return Math.abs(itemMinutes - currentMinutes) <= 5;
      });
      
      const comparisonPoint = sortedComparisonData.find(item => {
        const itemMinutes = getTimeMinutes(item.timestamp);
        return Math.abs(itemMinutes - currentMinutes) <= 5;
      });

      timePoints.push({
        timestamp: current,
        time: format(current, "HH:mm", { locale: ja }),
        hour: hour,
        male: currentData?.male,
        female: currentData?.female,
        prevMale: comparisonPoint?.male,
        prevFemale: comparisonPoint?.female,
      });
    }

    current = new Date(current.getTime() + slotInterval);
  }

  return timePoints;
}