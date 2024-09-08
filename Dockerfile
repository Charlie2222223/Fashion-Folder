FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# ホストからファイルをコピー
COPY . .

# Next.jsの依存関係をインストール
RUN npm install

# 開発サーバーを起動
EXPOSE 3000
CMD ["npm", "run", "dev"]