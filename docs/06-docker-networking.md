Dưới đây là **Bài 6 – Docker Networking** trong loạt series Docker của bạn:

---

## 🌐 Bài 6 – Docker Networking

### 🎯 Mục tiêu:

* Hiểu các loại mạng trong Docker
* Kết nối các container lại với nhau
* Dùng Docker Compose để cấu hình mạng đơn giản

---

## 1. 🧠 Khái niệm cơ bản

Docker có hệ thống mạng ảo giúp các container **liên lạc với nhau** và/hoặc với **host bên ngoài**.

---

## 2. 📦 Các loại mạng trong Docker

| Loại mạng   | Mô tả                                           |
| ----------- | ----------------------------------------------- |
| **bridge**  | Mạng mặc định khi chạy container (`docker run`) |
| **host**    | Dùng mạng của máy chủ, không cách ly            |
| **none**    | Không có kết nối mạng                           |
| **overlay** | Dùng cho Docker Swarm (multi-host)              |
| **macvlan** | Container có IP riêng trong mạng LAN            |

---

## 3. 🔗 Mạng bridge (thường dùng nhất)

### Tạo mạng riêng:

```bash
docker network create mynet
```

### Chạy container và gắn vào mạng:

```bash
docker run -d --name app1 --network mynet myimage
docker run -d --name app2 --network mynet myimage
```

> Các container trong cùng mạng `mynet` có thể gọi nhau bằng tên.

### Ví dụ: Kết nối từ app1 → app2:

```bash
curl http://app2:port
```

---

## 4. 📂 Kiểm tra mạng

* Liệt kê mạng:

```bash
docker network ls
```

* Xem chi tiết mạng:

```bash
docker network inspect mynet
```

---

## 5. 🤝 Kết nối tự động với Docker Compose

Docker Compose tự tạo 1 mạng riêng cho các service, giúp các container có thể dùng hostname theo tên service.

### Ví dụ `docker-compose.yml`:

```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  app:
    image: my-app
```

→ Trong container `web`, có thể gọi `http://app` mà không cần IP.

---

## 6. 📌 Tóm tắt

| Mục                | Ghi nhớ                      |
| ------------------ | ---------------------------- |
| Mạng mặc định      | `bridge`                     |
| Container gọi nhau | Dùng cùng mạng, gọi bằng tên |
| Docker Compose     | Tạo mạng ảo tự động          |
| Kiểm tra mạng      | `docker network inspect`     |

---

Nếu bạn cần ví dụ thực tế như **gọi từ container A sang container B bằng tên**, hoặc dùng thử Docker Compose để tạo mạng nhanh, mình có thể hướng dẫn tiếp nhé!
