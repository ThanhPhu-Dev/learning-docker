FROM node:18-slim
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Chạy với user không phải root (node là user mặc định có sẵn trong image)
USER node

CMD ["node", "index.js"]

# ✅ Giải thích:

#     --omit=dev: Bỏ qua các gói dev → giảm kích thước & rủi ro.
    
#     USER node: Tránh chạy container với quyền root.
    
    