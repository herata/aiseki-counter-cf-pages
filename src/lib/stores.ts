export type StoreType = "ag" | "ol" | "jis";

export interface Store {
	id: string;
	type: StoreType;
	name: string;
	location: string;
	prefecture: string;
}

// Define prefecture order
const PREFECTURE_ORDER = [
	"東京",
	"大阪",
	"愛知",
	"北海道",
	"宮城",
	"栃木",
	"群馬",
	"埼玉",
	"神奈川",
	"石川",
	"静岡",
	"京都",
	"兵庫",
	"岡山",
	"広島",
	"愛媛",
	"福岡",
	"長崎",
	"熊本",
	"宮崎",
	"鹿児島",
	"沖縄",
	"韓国",
];

export const stores: Store[] = [
	// AG stores
	{
		id: "sapporo_ag",
		type: "ag",
		name: "AG",
		location: "札幌",
		prefecture: "北海道",
	},
	{
		id: "sendai_ag",
		type: "ag",
		name: "AG",
		location: "仙台",
		prefecture: "宮城",
	},
	{
		id: "kanazawa_ag",
		type: "ag",
		name: "AG",
		location: "金沢",
		prefecture: "石川",
	},
	{
		id: "ueno_ag",
		type: "ag",
		name: "AG",
		location: "上野",
		prefecture: "東京",
	},
	{
		id: "shibuya_ag",
		type: "ag",
		name: "AG",
		location: "渋谷",
		prefecture: "東京",
	},
	{
		id: "nagoya_ag",
		type: "ag",
		name: "AG",
		location: "名古屋",
		prefecture: "愛知",
	},
	{
		id: "umeda_ag",
		type: "ag",
		name: "AG",
		location: "梅田",
		prefecture: "大阪",
	},
	{
		id: "hiroshima_ag",
		type: "ag",
		name: "AG",
		location: "広島",
		prefecture: "広島",
	},
	{
		id: "okinawa_ag",
		type: "ag",
		name: "AG",
		location: "沖縄",
		prefecture: "沖縄",
	},

	// オリラジ stores
	{
		id: "gangnam_ol",
		type: "ol",
		name: "オリラジ",
		location: "江南",
		prefecture: "韓国",
	},
	{
		id: "utsunomiya_ol",
		type: "ol",
		name: "オリラジ",
		location: "宇都宮",
		prefecture: "栃木",
	},
	{
		id: "takasaki_ol",
		type: "ol",
		name: "オリラジ",
		location: "高崎",
		prefecture: "群馬",
	},
	{
		id: "omiya_ol",
		type: "ol",
		name: "オリラジ",
		location: "大宮",
		prefecture: "埼玉",
	},
	{
		id: "ueno_ol",
		type: "ol",
		name: "オリラジ",
		location: "上野",
		prefecture: "東京",
	},
	{
		id: "shinjuku_ol",
		type: "ol",
		name: "オリラジ",
		location: "新宿",
		prefecture: "東京",
	},
	{
		id: "shibuyahonten_ol",
		type: "ol",
		name: "オリラジ",
		location: "渋谷本店",
		prefecture: "東京",
	},
	{
		id: "ebisu_ol",
		type: "ol",
		name: "オリラジ",
		location: "恵比寿",
		prefecture: "東京",
	},
	{
		id: "machida_ol",
		type: "ol",
		name: "オリラジ",
		location: "町田",
		prefecture: "東京",
	},
	{
		id: "yokohama_ol",
		type: "ol",
		name: "オリラジ",
		location: "横浜",
		prefecture: "神奈川",
	},
	{
		id: "shizuoka_ol",
		type: "ol",
		name: "オリラジ",
		location: "静岡",
		prefecture: "静岡",
	},
	{
		id: "hamamatsu_ol",
		type: "ol",
		name: "オリラジ",
		location: "浜松",
		prefecture: "静岡",
	},
	{
		id: "nagoyasakae_ol",
		type: "ol",
		name: "オリラジ",
		location: "名古屋栄",
		prefecture: "愛知",
	},
	{
		id: "nagoyanishiki_ol",
		type: "ol",
		name: "オリラジ",
		location: "名古屋錦",
		prefecture: "愛知",
	},
	{
		id: "kyoto_ol",
		type: "ol",
		name: "オリラジ",
		location: "京都",
		prefecture: "京都",
	},
	{
		id: "shinsaibashi_ol",
		type: "ol",
		name: "オリラジ",
		location: "心斎橋",
		prefecture: "大阪",
	},
	{
		id: "namba_ol",
		type: "ol",
		name: "オリラジ",
		location: "難波",
		prefecture: "大阪",
	},
	{
		id: "temma_ol",
		type: "ol",
		name: "オリラジ",
		location: "天満",
		prefecture: "大阪",
	},
	{
		id: "kobe_ol",
		type: "ol",
		name: "オリラジ",
		location: "神戸",
		prefecture: "兵庫",
	},
	{
		id: "okayama_ol",
		type: "ol",
		name: "オリラジ",
		location: "岡山",
		prefecture: "岡山",
	},
	{
		id: "kokura_ol",
		type: "ol",
		name: "オリラジ",
		location: "小倉",
		prefecture: "福岡",
	},
	{
		id: "fukuoka_ol",
		type: "ol",
		name: "オリラジ",
		location: "福岡",
		prefecture: "福岡",
	},
	{
		id: "nagasaki_ol",
		type: "ol",
		name: "オリラジ",
		location: "長崎",
		prefecture: "長崎",
	},
	{
		id: "kumamoto_ol",
		type: "ol",
		name: "オリラジ",
		location: "熊本",
		prefecture: "熊本",
	},
	{
		id: "miyazaki_ol",
		type: "ol",
		name: "オリラジ",
		location: "宮崎",
		prefecture: "宮崎",
	},
	{
		id: "kagoshima_ol",
		type: "ol",
		name: "オリラジ",
		location: "鹿児島",
		prefecture: "鹿児島",
	},

	// JIS stores
	{
		id: "sapporo_jis",
		type: "jis",
		name: "JIS",
		location: "札幌",
		prefecture: "北海道",
	},
	{
		id: "omiya_jis",
		type: "jis",
		name: "JIS",
		location: "大宮",
		prefecture: "埼玉",
	},
	{
		id: "shinjuku_jis",
		type: "jis",
		name: "JIS",
		location: "新宿",
		prefecture: "東京",
	},
	{
		id: "nishishinjuku_jis",
		type: "jis",
		name: "JIS",
		location: "西新宿",
		prefecture: "東京",
	},
	{
		id: "umeda_jis",
		type: "jis",
		name: "JIS",
		location: "梅田",
		prefecture: "大阪",
	},
	{
		id: "namba_jis",
		type: "jis",
		name: "JIS",
		location: "難波",
		prefecture: "大阪",
	},
	{
		id: "matsuyama_jis",
		type: "jis",
		name: "JIS",
		location: "松山",
		prefecture: "愛媛",
	},
	{
		id: "fukuoka_jis",
		type: "jis",
		name: "JIS",
		location: "福岡",
		prefecture: "福岡",
	},
	{
		id: "kumamoto_jis",
		type: "jis",
		name: "JIS",
		location: "熊本",
		prefecture: "熊本",
	},
];

// Get ordered prefectures
export const prefectures = PREFECTURE_ORDER.filter((prefecture) =>
	stores.some((store) => store.prefecture === prefecture),
);

// Get stores by prefecture
export function getStoresByPrefecture(prefecture: string) {
	return stores.filter((store) => store.prefecture === prefecture);
}
