# 数字記憶ゲーム（Number Memory Game）

数字記憶ゲームのウェブアプリケーションです。AWS上でホスティングされています。

## 機能概要

- 数字を記憶して入力するシンプルなゲーム
- レベルが上がるごとに桁数が増加（初期レベル: 3桁）
- スコアとハイスコアの記録（ローカルストレージに保存）
- レスポンシブデザイン対応
- オフライン対応（静的サイト）

## 技術スタック

### フロントエンド
- Next.js 14（Static Export）
- TypeScript
- Tailwind CSS
- Radix UI Components
- Lucide React Icons

### バックエンド/インフラ
- AWS CDK（Infrastructure as Code）
- Amazon S3（静的ホスティング）
- Amazon CloudFront（CDN）
- Amazon Route 53（DNS）
- AWS Certificate Manager（SSL/TLS証明書）

## 前提条件

- Node.js 18.x以上
- AWS CLI（設定済み）
- AWS CDK CLI
- Git

## 初期セットアップ

1. リポジトリのクローン
```bash
git clone https://github.com/apc-maruyama/number-memory-game.git
cd number-memory-game
```

2. セットアップスクリプトの実行権限を付与
```bash
chmod +x tools/setup.sh
```

3. セットアップスクリプトを実行
```bash
./tools/setup.sh
```

4. バックエンドの設定を編集
```bash
# backend/config.ts を編集してドメイン名と証明書ARNを設定
```

5. デプロイの実行
```bash
./tools/deploy.sh <AWS_PROFILE>
```

## 開発環境

### フロントエンド開発サーバーの起動
```bash
cd frontend
npm run dev
```

### CDKコマンド
```bash
cd backend
cdk diff     # 変更内容の確認
cdk synth    # CloudFormationテンプレートの生成
cdk deploy   # デプロイ
```

## プロジェクト構造

```
.
├── frontend/           # Next.jsアプリケーション
│   ├── src/           # ソースコード
│   │   ├── app/       # Next.jsアプリケーションルート
│   │   └── components/# Reactコンポーネント
│   └── public/        # 静的ファイル
├── backend/           # AWS CDKプロジェクト
│   ├── bin/          # CDKアプリケーションエントリーポイント
│   └── lib/          # インフラストラクチャコード
├── tools/            # セットアップ・デプロイスクリプト
└── docs/             # ドキュメント
```

## デプロイ

1. フロントエンドのビルド（自動実行）
```bash
cd frontend
npm run build
```

2. インフラのデプロイとフロントエンドのアップロード（自動実行）
```bash
./tools/deploy.sh <AWS_PROFILE>
```

## 環境変数

### バックエンド（backend/config.ts）
- `domainName`: ドメイン名
- `certificateArn`: SSL証明書のARN

## 詳細ドキュメント

- [基本設計書](./docs/basic-design.md) - アーキテクチャと設計の詳細
- [フロントエンド](./frontend/README.md) - フロントエンド開発ガイド
- [バックエンド](./backend/README.md) - インフラストラクチャ構成

## トラブルシューティング

### デプロイ失敗時
1. CloudFormationスタックの状態確認
2. S3バケットの権限設定確認
3. CloudFrontディストリビューションの設定確認

### DNS設定
1. Route 53のレコード設定確認
2. ネームサーバーの伝播待ち（最大48時間）

## ライセンス

MIT License - 詳細は[LICENSE](./LICENSE)ファイルを参照してください。