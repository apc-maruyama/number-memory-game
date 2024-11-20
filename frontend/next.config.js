/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // 静的ファイルの出力を有効化
    images: {
        unoptimized: true  // 画像の最適化を無効化（静的出力に必要）
    },
    distDir: 'out'  // 出力ディレクトリを明示的に指定
}

module.exports = nextConfig 