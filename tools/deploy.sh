#!/bin/bash

# 引数チェック
if [ $# -ne 1 ]; then
    echo "使用方法: $0 <AWS_PROFILE>"
    echo "例: $0 default"
    exit 1
fi

# プロジェクトルートディレクトリの取得
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# AWS プロファイルの設定
export AWS_PROFILE=$1

# プロファイルの存在確認
if ! aws configure list-profiles | grep -q "^${AWS_PROFILE}$"; then
    echo "エラー: プロファイル '${AWS_PROFILE}' が見つかりません"
    echo "利用可能なプロファイル:"
    aws configure list-profiles
    exit 1
fi

echo "AWS プロファイル '${AWS_PROFILE}' を使用します"

# フロントエンドのビルド
cd "${PROJECT_ROOT}/frontend" || exit 1
echo "フロントエンドをビルドしています..."
if ! npm run build; then
    echo "ビルドに失敗しました"
    exit 1
fi

# バックエンドのデプロイ
echo "バックエンドをデプロイしています..."
cd "${PROJECT_ROOT}/backend" || exit 1
if ! cdk deploy --profile "$AWS_PROFILE"; then
    echo "CDKデプロイに失敗しました"
    exit 1
fi

# スタック名の設定
STACK_NAME="NumberMemoryGameStack"

# S3バケット名の取得
echo "S3バケット名を取得しています..."
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name ${STACK_NAME} \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --output text)

if [ -z "$BUCKET_NAME" ]; then
    echo "エラー: S3バケット名の取得に失敗しました"
    exit 1
fi

# ビルドファイルのアップロード
echo "S3バケット '${BUCKET_NAME}' にファイルをアップロードしています..."
aws s3 sync "${PROJECT_ROOT}/frontend/out" "s3://${BUCKET_NAME}" --delete

# CloudFrontのキャッシュ削除
echo "CloudFrontのキャッシュを削除しています..."
DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name ${STACK_NAME} \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
    --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "エラー: CloudFront Distribution IDの取得に失敗しました"
    exit 1
fi

aws cloudfront create-invalidation \
    --distribution-id "${DISTRIBUTION_ID}" \
    --paths "/*"

echo "デプロイが完了しました" 