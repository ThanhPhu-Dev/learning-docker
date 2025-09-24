FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]


# docker build -t volume-demo .
# Bước 4: Chạy với volume
# docker volume create my-vol
# docker run --rm -v my-vol:/data volume-demo
# kiểm tra: 
# docker run -it --rm -v my-vol:/data alpine sh
# cat /data/file.txt
# Bước 5: Chạy lại nhưng với bind mount
# mkdir host-data
# docker run --rm -v $(pwd)/host-data:/data volume-demo





# Bài 9:
#     | Loại           | Đặc điểm chính                               | Dùng khi nào                         |
#     | -------------- | -------------------------------------------- | ------------------------------------ |
#     | **Volume**     | Docker quản lý, nằm trong `/var/lib/docker`  | Dùng phổ biến trong production       |
#     | **Bind mount** | Trỏ thẳng vào 1 thư mục cụ thể trên máy host | Dễ debug, dùng trong phát triển      |
#     | **tmpfs**      | RAM only, dữ liệu mất khi container tắt      | Dùng tạm thời, bảo mật (ví dụ token) |
    
#     1. Bind Mount (gắn thư mục máy thật)
#         docker run -v $(pwd)/data:/app/data my-image
#     Chú thích:
#     $(pwd)/data là thư mục trên máy thật
    
#     /app/data là thư mục bên trong container
    
#     📌 Thích hợp khi dev, vì bạn có thể edit file trên máy thật và thấy thay đổi ngay.
    
#     2. Volume (do Docker tạo và quản lý)
    
#         docker volume create my-data
#         docker run -v my-data:/app/data my-image
#     Chú thích:
#     Dữ liệu nằm trong /var/lib/docker/volumes/my-data/_data
    
#     An toàn, tách biệt → dùng trong production
    