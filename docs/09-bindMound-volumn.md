Dưới đây là **Bài 9 – So sánh Bind Mount vs Volume (nâng cao)** được cập nhật lại, **có thêm phần hướng dẫn sử dụng với Docker Compose** ở cuối bài:

---

## 📁 Bài 9 – So sánh Bind Mount vs Volume (Nâng Cao)

### 🎯 Mục tiêu

* Phân biệt sâu hơn giữa Bind Mount và Volume
* Biết khi nào nên dùng mỗi loại
* Thực hành với Docker Compose

---

## 1. 🔍 Định nghĩa

* **Bind Mount**:
  Gắn trực tiếp thư mục trên **host** vào container.
  → Thường dùng cho **môi trường dev** (live reload, chỉnh sửa code trực tiếp).

* **Docker Volume**:
  Vùng lưu trữ **do Docker quản lý**, nằm ngoài container.
  → Dùng trong **production** để giữ dữ liệu bền vững, dễ backup.

---

## 2. ⚖️ So sánh chi tiết

| Tiêu chí            | Bind Mount                | Docker Volume                    |
| ------------------- | ------------------------- | -------------------------------- |
| Đường dẫn host      | Cần chỉ rõ                | Docker tự quản lý                |
| Hiệu suất           | Phụ thuộc OS, file system | Tối ưu hiệu suất hơn trên Linux  |
| Dễ mang đi          | Khó (phụ thuộc đường dẫn) | Dễ (volume portable)             |
| Dùng cho dev        | ✅ Live reload             | ❌ Không tiện sửa code            |
| Dùng cho production | ❌ Không an toàn           | ✅ An toàn cho dữ liệu (DB, logs) |

---

## 3. 🧪 Ví dụ Bind Mount vs Volume

### ✅ Bind Mount (Dev)

```bash
docker run -d \
  --name web-dev \
  -v $(pwd)/src:/app \
  -p 3000:3000 \
  node:18
```

### ✅ Volume (DB)

```bash
docker volume create db-data

docker run -d \
  --name mysql \
  -v db-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=123 \
  mysql:8
```

---

## 4. 🧩 Dùng Volume/Bind Mount trong Docker Compose

### 📄 Cấu trúc Docker Compose sử dụng cả 2:

```yaml
version: '3.8'
services:
  web:
    image: node:18
    volumes:
      - ./src:/app             # Bind mount
    working_dir: /app
    command: ["npm", "start"]
    ports:
      - "3000:3000"

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - db-data:/var/lib/mysql # Docker volume

volumes:
  db-data:
```

---

## 5. 🧠 Khi nào dùng cái nào?

| Tình huống                           | Nên dùng   |
| ------------------------------------ | ---------- |
| Code thay đổi thường xuyên           | Bind Mount |
| Chạy DB, lưu logs, lưu file uploads  | Volume     |
| Tự động hóa CI/CD                    | Volume     |
| Làm việc nhóm (không phụ thuộc host) | Volume     |
| Test local, sửa nhanh                | Bind Mount |

---

## ✅ Tổng kết

* **Bind Mount** phù hợp dev, thay đổi nhanh
* **Volume** phù hợp prod, lưu dữ liệu an toàn
* Trong Docker Compose, bạn có thể dễ dàng dùng cả hai tuỳ tình huống
* `volumes:` ở root dùng để định nghĩa và quản lý Docker volume dùng chung

---

Bạn có thể yêu cầu mình demo một **project hoàn chỉnh** dùng cả bind mount (frontend) và volume (database) nếu muốn thực hành sâu hơn!
