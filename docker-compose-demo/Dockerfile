# Sử dụng image Node.js chính thức, phiên bản 18 LTS
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json trước để tối ưu cache
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose port (thay đổi nếu app dùng cổng khác)
EXPOSE 3000

# Lệnh khởi động ứng dụng
CMD ["npm", "start"]
