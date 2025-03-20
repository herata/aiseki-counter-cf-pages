import { apiClient } from "@/lib/api";
import type { VisitorData, VisitorDataRequest } from "@/types/visitor";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";

type UseVisitorDataResult = {
	data: VisitorData | undefined;
	comparisonData: VisitorData | undefined;
	isLoading: boolean;
	error: Error | null;
};

export function useVisitorData(
	params: VisitorDataRequest,
): UseVisitorDataResult {
	const currentQuery = useQuery<VisitorData, Error>({
		queryKey: ["visitor-data", params],
		queryFn: () => apiClient.fetchVisitorData(params),
		enabled: !!params.shop && !!params.date,
	});

	const comparisonQuery = useQuery<VisitorData, Error>({
		queryKey: [
			"visitor-data",
			{
				...params,
				date: format(subDays(new Date(params.date), 7), "yyyy-MM-dd"),
			},
		],
		queryFn: () =>
			apiClient.fetchVisitorData({
				...params,
				date: format(subDays(new Date(params.date), 7), "yyyy-MM-dd"),
			}),
		enabled: !!params.shop && !!params.date,
	});

	return {
		data: currentQuery.data,
		comparisonData: comparisonQuery.data,
		isLoading: currentQuery.isLoading || comparisonQuery.isLoading,
		error: currentQuery.error || comparisonQuery.error,
	};
}
