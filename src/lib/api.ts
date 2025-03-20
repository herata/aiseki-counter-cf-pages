import type { VisitorData, VisitorDataRequest } from "@/types/visitor";

if (!process.env.NEXT_PUBLIC_API_URL) {
	throw new Error("NEXT_PUBLIC_API_URL environment variable is not set");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RawVisitorDataItem {
	timestamp: string;
	male: string | number;
	female: string | number;
}

interface RawVisitorData {
	shop: string;
	date: string;
	data: RawVisitorDataItem[];
}

class ApiClient {
	private baseUrl: string;

	constructor() {
		this.baseUrl = API_URL;
	}

	async fetchVisitorData(params: VisitorDataRequest): Promise<VisitorData> {
		try {
			const response = await fetch(this.baseUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(params),
			});

			if (!response.ok) {
				const errorData = (await response.json()) as { message?: string };
				throw new Error(errorData.message ?? "Failed to fetch visitor data");
			}

			const data = (await response.json()) as RawVisitorData;

			return {
				shop: data.shop,
				date: data.date,
				data: data.data.map((item) => ({
					timestamp: Number(item.timestamp),
					male: Number(item.male),
					female: Number(item.female),
					total: Number(item.male) + Number(item.female),
				})),
			};
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`API Error: ${error.message}`);
			}
			throw new Error("An unknown error occurred");
		}
	}
}

export const apiClient = new ApiClient();
