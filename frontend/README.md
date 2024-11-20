# フロントエンド（Number Memory Game）

Next.jsで実装された数字記憶ゲームのフロントエンドです。

## 技術スタック

- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide React Icons

## 開発環境のセットアップ

```bash
# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## ビルド

```bash
# 静的ファイルの生成
npm run build
```

## プロジェクト構造

```
src/
├── app/                    # Next.jsアプリケーションルート
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # メインページ
├── components/            # Reactコンポーネント
│   ├── NumberMemoryGame/  # ゲームのメインコンポーネント
│   └── ui/               # 共通UIコンポーネント
└── lib/                  # ユーティリティ関数
```

## コンポーネント設計

### アトミックデザイン
- Atoms: Button, Input, Card等の基本コンポーネント
- Molecules: ゲーム画面の各セクション
- Organisms: ゲーム全体のコンポーネント

### 状態管理
- Reactの`useState`フックを使用
- ローカルストレージでハイスコアを保持

## スタイリング

- Tailwind CSSによるユーティリティファーストアプローチ
- カスタムコンポーネントにはcn関数でクラス名を結合
- レスポンシブデザインの考慮

## テスト

```bash
# ユニットテストの実行
npm test

# E2Eテストの実行
npm run test:e2e
```
