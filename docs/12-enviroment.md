Dưới đây là **Bài 12 – Multi-container & Environment (biến môi trường)** trong loạt bài Docker của bạn:

---

## 🚀 Bài 12 – Multi-container & Environment (biến môi trường)

### 🎯 Mục tiêu:

* Chạy nhiều container cùng lúc bằng Docker Compose
* Sử dụng biến môi trường để cấu hình
* Sử dụng `docker secret` (nếu có dùng Swarm)

---

## 1. 🧩 Multi-container với Docker Compose

Docker Compose cho phép bạn định nghĩa **nhiều container (dịch vụ)** trong **1 file `docker-compose.yml`**.

### 🛠 Ví dụ đơn giản:

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "80:80"

  app:
    image: my-app:latest
    environment:
      - APP_ENV=production
```

Chạy lên bằng:

```bash
docker compose up -d
```

---

## 2. 🌱 Environment Variables – Biến môi trường

Biến môi trường rất quan trọng để cấu hình ứng dụng (không hard-code vào image).

### 📦 Có 3 cách khai báo:

#### a. Inline trong compose:

```yaml
environment:
  - DB_HOST=db
  - DB_PORT=3306
```

#### b. Từ file `.env`:

```bash
# .env
DB_HOST=db
DB_PORT=3306
```

Rồi dùng trong `docker-compose.yml`:

```yaml
environment:
  - DB_HOST=${DB_HOST}
  - DB_PORT=${DB_PORT}
```

#### c. Gọi `docker run`:

```bash
docker run -e APP_ENV=production my-app
```

---

## 3. 🔐 Docker Secret (Swarm mode)

### ❓ Tại sao cần?

Biến môi trường chứa password/API key có thể **bị lộ nếu inspect container**. Docker Secret giúp **bảo mật giá trị nhạy cảm** khi chạy trong Swarm.

### 🛠️ Dùng thử:

```bash
# Tạo secret
echo "my-password" | docker secret create db_password -

# Dùng trong service (chỉ khi dùng Swarm)
docker service create \
  --name myapp \
  --secret db_password \
  my-app
```

### Trong container:

Secret được mount ở `/run/secrets/db_password`.

---

## 4. 🔄 Tóm tắt

| Tính năng        | Mục đích                                |
| ---------------- | --------------------------------------- |
| `docker-compose` | Quản lý nhiều container dễ dàng         |
| `environment:`   | Truyền cấu hình cho container           |
| `.env file`      | Tách riêng config khỏi code             |
| `docker secret`  | Bảo mật dữ liệu nhạy cảm khi dùng Swarm |

---

Bạn muốn mình demo ví dụ cụ thể hơn với `docker secret`, hay giải thích thêm về `.env` và cách mount bí mật khi dùng Compose hoặc Swarm?
