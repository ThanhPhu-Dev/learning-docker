Tuyệt vời! Chào mừng đến với **Bài 16: Docker trong môi trường Production** – nơi bạn sẽ học cách vận hành Docker **an toàn, ổn định và tự động khôi phục khi lỗi** trong môi trường thực tế.

---

## 🚀 Bài 16 – Docker trong Production

### 🎯 Mục tiêu:

* Tự động khởi động lại container khi lỗi
* Kiểm tra tình trạng container (healthcheck)
* Quản lý log hiệu quả
* Một số mẹo tối ưu

---

## 1. 🔁 Restart Policy – Tự khởi động lại container

### ❓ Vấn đề:

Khi container bị lỗi (ngắt điện, lỗi app), container sẽ **không tự chạy lại** nếu không có cấu hình.

### ✅ Giải pháp:

Docker hỗ trợ **restart policy** để tự động khởi động lại container theo các điều kiện.

### 🛠️ Cú pháp:

```bash
docker run --restart=always ...
```

### Các tùy chọn:

| Tùy chọn         | Ý nghĩa                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `no`             | Mặc định – không restart                                           |
| `on-failure[:N]` | Restart nếu container thoát với lỗi (exit code != 0), tối đa N lần |
| `always`         | Luôn restart, kể cả khi docker start lại                           |
| `unless-stopped` | Restart trừ khi bạn `docker stop`                                  |

> **Khuyên dùng:** `--restart=unless-stopped` để an toàn và kiểm soát được.

---

## 2. ❤️ Healthcheck – Kiểm tra tình trạng app

### ❓ Vấn đề:

Một container **có thể vẫn đang chạy** nhưng app bên trong **đã lỗi** (ví dụ: server bị treo cổng).

### ✅ Giải pháp:

Thêm `HEALTHCHECK` vào Dockerfile hoặc dòng lệnh để kiểm tra app còn sống không.

### 🛠️ Dockerfile ví dụ:

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1
```

### 🛠️ Hoặc khi chạy:

```bash
docker run --health-cmd="curl -f http://localhost:8080/health || exit 1" ...
```

> Sau đó kiểm tra:

```bash
docker inspect --format='{{json .State.Health}}' container_name
```

---

## 3. 📋 Logging – Ghi log hiệu quả

### ❓ Vấn đề:

Log container có thể bị mất nếu không quản lý tốt.

### ✅ Cách quản lý:

#### a. Xem log:

```bash
docker logs container_name
```

#### b. Ghi log ra file:

```bash
docker run --log-driver json-file ...
```

#### c. Sử dụng log volume:

```bash
-v /var/log/myapp:/app/log
```

> Bạn có thể mount log vào host, hoặc dùng `docker logs` forwarding đến ELK, Grafana Loki,…

---

## 4. 🧱 Một số mẹo Production khác

### ✅ Dùng tên tag cụ thể

> Tránh dùng `:latest`, hãy dùng `:v1.2.3` để kiểm soát rõ ràng version.

### ✅ Chạy bằng `non-root` user

> Docker container không nên chạy bằng root. Dùng `USER appuser` trong Dockerfile.

### ✅ Giới hạn tài nguyên:

```bash
docker run --memory=512m --cpus=1 ...
```

### ✅ Scan lỗ hổng image:

```bash
docker scan your-image
```

---

## ✅ Tổng kết bài 16

| Kỹ thuật           | Lợi ích sản xuất                 |
| ------------------ | -------------------------------- |
| `--restart` policy | Tự động khởi động lại            |
| Healthcheck        | Biết app còn sống hay không      |
| Log driver, volume | Ghi log bền vững                 |
| Giới hạn CPU/mem   | Tránh container chiếm tài nguyên |
| Dùng non-root      | An toàn hơn                      |

---

## 📚 Tiếp theo: **Bài 17 – Docker Swarm: Quản lý nhiều container, tự động scale**

Bạn muốn học tiếp Swarm ngay không? Hay mình demo một healthcheck & restart script cụ thể trước khi qua bài mới?
