# Giai đoạn 1: Build app
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Giai đoạn 2: Image chạy app
FROM node:18-slim AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
CMD ["node", "dist/index.js"]

# docker build --target builder -t my-app-builder .
# --target builder: Docker chỉ build đến giai đoạn builder.
# -t my-app-builder: Đặt tên cho image vừa build.
# .: Chỉ định Dockerfile và thư mục context.
