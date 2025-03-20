export interface VisitorDataRequest {
	shop: string;
	date: string;
}

export interface VisitorData {
	shop: string;
	date: string;
	data: {
		timestamp: number;
		male: number;
		female: number;
		total?: number;
	}[];
}
