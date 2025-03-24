# 相席カウンター

このプロジェクトは[Next.js](https://nextjs.org/)を使用して作成された、相席店舗の男女別人数推移を可視化するWebアプリケーションです。[`c3`](https://developers.cloudflare.com/pages/get-started/c3)でブートストラップされています。

デプロイ先: [https://aiseki-counter.pages.dev](https://aiseki-counter.pages.dev)

## 機能

- 都道府県と店舗の選択
- 日付の選択（当日まで）
- 18:00から翌2:50までの男女別人数推移のグラフ表示
- 当日と前週の比較表示（前週は半透明で表示）
- データ欠損時も一貫した時間範囲での表示
- 選択状態のセッション維持

## 使用技術

- **フレームワーク**: Next.js 14
- **スタイリング**: Tailwind CSS
- **UI コンポーネント**: shadcn/ui
- **グラフ表示**: Recharts
- **デプロイ**: Cloudflare Pages
- **開発ツール**: TypeScript, Biome

## 開発の始め方

開発サーバーを起動するには：

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開くと結果が表示されます。

## Cloudflare連携

`c3`は[Cloudflare Pages](https://pages.cloudflare.com/)環境との連携のために以下の追加スクリプトを提供しています：

- `pages:build`: [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) CLIを使用してPagesのビルドを行う
- `preview`: [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLIを使用してローカルでPagesアプリケーションをプレビュー
- `deploy`: [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLIを使用してPagesアプリケーションをデプロイ

> __注意:__ `dev`スクリプトはローカル開発に最適ですが、Pages環境で正しく動作することを確認するために、（定期的またはデプロイ前に）Pagesアプリケーションのプレビューも行うべきです。詳細は[`@cloudflare/next-on-pages`の推奨ワークフロー](https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md#recommended-development-workflow)を参照してください。

### Bindings

Cloudflare [Bindings](https://developers.cloudflare.com/pages/functions/bindings/)は、Cloudflareプラットフォームで利用可能なリソースとの対話を可能にします。

Bindingsは開発時、ローカルプレビュー時、そしてデプロイされたアプリケーションで使用できます：

- 開発モードでBindingsを使用するには、`next.config.js`の`setupDevBindings`で定義する必要があります。
- プレビューモードでBindingsを使用するには、`wrangler pages dev`コマンドに従って`pages:preview`スクリプトに追加する必要があります。
- デプロイされたアプリケーションでBindingsを使用するには、Cloudflare[ダッシュボード](https://dash.cloudflare.com/)で設定する必要があります。

詳細は各ドキュメントを参照してください。

## プロジェクト構成

```
src/
  ├── app/              # Appルーター
  ├── components/       # UIコンポーネント
  │   ├── LocationSelect/  # 場所選択関連
  │   ├── VisitorChart/    # グラフ表示関連
  │   └── ui/             # 共通UIコンポーネント
  ├── hooks/           # カスタムフック
  ├── lib/            # ユーティリティ
  ├── provider/       # プロバイダー
  └── types/          # 型定義
```

## コードガイドライン

- ソースコード内のコメントは英語で記載
- コンポーネントは機能ごとに分割
- 型定義はTypeScriptを使用
- スタイリングはTailwind CSSを使用
