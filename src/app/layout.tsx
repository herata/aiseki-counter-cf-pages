import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/provider/tanstack-provider";

export const metadata: Metadata = {
	title: "相席カウンター",
	description: "相席系居酒屋の人数推移を可視化",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className="bg-gradient-to-br from-sky-100 to-red-100 min-h-screen">
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
