FROM node:18

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start"]

# docker build --tag image-name . : de tao ra image từ docker nằm ở vị trí chạy lênh(.)
# docker run -d -p 3001:3000  --name container-name imagen-name: tao (run) container  với tên là container-name từ image-name, bind 3000 của ứng dung ra bên ngoài với port 3001 

# có thể kết hợp cả 2 bằng cách:
# docker run -p 3000:3000 $(docker build -q .)
# -q, --quiet Suppress the build output and print image ID on success

# dùng docker logs container-name-or-id: xem log của 1 container
# dùng docker exec -it container-name-or-id bash: truy cập vào container bằng bash hoặc sh, i = interactive | t = terminalca