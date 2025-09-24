FROM node:18-slim
WORKDIR /app
COPY app/package*.json .
RUN npm install
COPY . .
CMD ["npm", "start"]

# docker build -f app/Dockerfile -t my-app . : cach chi dinh file dockerfile (-f app/Dockerfile) nhung build context dang nam o ngoai