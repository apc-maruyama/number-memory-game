#!/bin/bash

# プロジェクトルートディレクトリの取得
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "セットアップを開始します..."

# フロントエンドのセットアップ
echo "フロントエンドをセットアップしています..."
cd "${PROJECT_ROOT}/frontend" || exit 1
if ! npm install; then
    echo "フロントエンドのパッケージインストールに失敗しました"
    exit 1
fi

# バックエンドのセットアップ
echo "バックエンドをセットアップしています..."
cd "${PROJECT_ROOT}/backend" || exit 1
if ! npm install; then
    echo "バックエンドのパッケージインストールに失敗しました"
    exit 1
fi

# 設定ファイルのコピー
if [ ! -f "config.ts" ]; then
    echo "設定ファイルをコピーしています..."
    cp config.template.ts config.ts
    echo "config.tsを編集して、適切なドメイン名と証明書ARNを設定してください"
fi

# デプロイスクリプトに実行権限を付与
echo "スクリプトに実行権限を付与しています..."
chmod +x "${PROJECT_ROOT}/tools/deploy.sh"

echo "セットアップが完了しました"
echo ""
echo "次のステップ:"
echo "1. backend/config.ts を編集してドメイン名と証明書ARNを設定"
echo "2. デプロイを実行: ./tools/deploy.sh <AWS_PROFILE>" 