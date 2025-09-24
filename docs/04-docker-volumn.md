Dưới đây là nội dung **Bài 4 – Docker Volume: Lưu dữ liệu vĩnh viễn**, một phần quan trọng trong việc quản lý dữ liệu với Docker.

---

## 🗃️ Bài 4 – Docker Volume: Lưu dữ liệu vĩnh viễn

### 🎯 Mục tiêu:

* Hiểu Volume là gì
* Tạo và gắn Volume vào container
* Phân biệt Volume với Bind Mount
* Quản lý dữ liệu vĩnh viễn trong Docker

---

## 1. ❓ Tại sao cần Volume?

Mặc định, khi container bị xóa, **dữ liệu trong container cũng mất**.

> Ví dụ: Chạy MySQL container → xóa container → mất toàn bộ database!

**Volume** là nơi lưu trữ **ngoài container**, giúp **dữ liệu không bị mất** khi container chết hoặc bị xoá.

---

## 2. 📦 Tạo Volume và gắn vào container

### Tạo volume:

```bash
docker volume create mydata
```

### Gắn vào container:

```bash
docker run -d \
  --name mycontainer \
  -v mydata:/app/data \
  myimage
```

> Thư mục `/app/data` trong container sẽ **được lưu trên volume `mydata`**.

---

## 3. 📁 So sánh Volume vs Bind Mount

| Tính năng          | Volume                   | Bind Mount                             |
| ------------------ | ------------------------ | -------------------------------------- |
| Tạo tự động        | ✅                        | ❌ (phải chỉ rõ đường dẫn)              |
| Dễ di chuyển       | ✅ Dùng tên volume        | ❌ Phụ thuộc đường dẫn host cụ thể      |
| An toàn, hiệu suất | ✅ Docker quản lý tốt hơn | ❌ Có thể gặp lỗi permission            |
| Use case phổ biến  | Dữ liệu production       | Dùng khi cần chia sẻ file code khi dev |

---

## 4. 📂 Kiểm tra và quản lý volume

* **Liệt kê volumes:**

```bash
docker volume ls
```

* **Xem chi tiết volume:**

```bash
docker volume inspect mydata
```

* **Xoá volume (cẩn thận!):**

```bash
docker volume rm mydata
```

---

## 5. 🧪 Ví dụ thực tế với MySQL:

```bash
docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v mysql-data:/var/lib/mysql \
  mysql:8
```

> Dữ liệu database sẽ nằm trong volume `mysql-data`, không mất khi container chết.

---

## ✅ Tổng kết

| Nội dung        | Ghi nhớ                                    |
| --------------- | ------------------------------------------ |
| Volume là gì    | Cơ chế lưu dữ liệu bên ngoài container     |
| Gắn volume      | `-v mydata:/path/in/container`             |
| Volume vs Bind  | Volume an toàn hơn, dễ quản lý hơn         |
| Dùng volume khi | Cần dữ liệu bền vững (database, app state) |

---

Nếu bạn muốn mình mở rộng thêm về **bind mount nâng cao** hay demo sử dụng volume để backup/restore dữ liệu, cứ nói nhé!
