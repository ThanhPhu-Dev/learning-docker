Tuyệt vời! Chúng ta sẽ bắt đầu **Docker Bài 13: Logging & Debug** – giúp bạn kiểm tra và xử lý sự cố container một cách hiệu quả.

---

# 🧪 Docker Bài 13: Logging & Debug

## 1. 📋 Mục tiêu bài học

* Xem log của container
* Gỡ lỗi container bị lỗi
* Truy cập container để kiểm tra
* Hiểu cách logging hoạt động trong Docker

---

## 2. 📜 Xem log container với `docker logs`

```bash
docker logs <container_id hoặc container_name>
```

Ví dụ:

```bash
docker logs my_app
```

### Một số tùy chọn hay:

```bash
docker logs -f my_app          # Theo dõi log realtime (tail -f)
docker logs --tail 100 my_app  # Chỉ xem 100 dòng cuối
```

---

## 3. 🛠 Gỡ lỗi container đang chạy

### 🔍 Kiểm tra tình trạng container

```bash
docker ps -a
docker inspect <container>
```

### 🧑‍💻 Truy cập vào container

```bash
docker exec -it <container> /bin/sh
# hoặc nếu có bash
docker exec -it <container> /bin/bash
```

Bạn có thể kiểm tra file log, cấu hình, hoặc kết nối DB từ trong container.

---

## 4. 💥 Debug container **bị crash ngay sau khi start**

Container thoát liền sau khi chạy? Dùng mẹo này:

### Cách giữ container "đứng yên" để debug:

```bash
docker run -it --entrypoint /bin/sh <image>
```

Ví dụ:

```bash
docker run -it --entrypoint /bin/sh node:18
```

Sau đó bạn kiểm tra từ từ trong shell.

---

## 5. 📦 Gỡ lỗi với Docker Compose

```bash
docker-compose logs
docker-compose logs -f
docker-compose logs service_name
```

---

## 6. 📂 Log driver (nâng cao)

Docker hỗ trợ nhiều **log driver**, mặc định là `json-file` (log ghi vào file JSON trên host):

```bash
docker inspect <container> | grep LogPath
```

Một số log driver khác:

* `syslog`
* `journald`
* `fluentd`
* `awslogs`
* `gelf`

---

## 7. ✅ Mẹo Debug thường dùng

| Mục tiêu                     | Câu lệnh                             |
| ---------------------------- | ------------------------------------ |
| Kiểm tra container đang chạy | `docker ps`                          |
| Xem lý do container chết     | `docker ps -a` + `docker logs <id>`  |
| Vào trong container          | `docker exec -it <id> /bin/sh`       |
| Xem biến môi trường          | `docker exec <id> env`               |
| Kiểm tra volume mount        | `docker inspect <id>` + tìm `Mounts` |

---

## 🧪 Thử nghiệm thực tế

### Bước 1: Tạo app Python đơn giản có lỗi

`app.py`:

```python
print("Starting app")
raise Exception("Oops! App crashed.")
```

`Dockerfile`:

```Dockerfile
FROM python:3.9
COPY app.py .
CMD ["python", "app.py"]
```

```bash
docker build -t crash-app .
docker run --name test-crash crash-app
docker logs test-crash
```

Bạn sẽ thấy log:

```
Starting app
Traceback (most recent call last):
  ...
Exception: Oops! App crashed.
```

---

Bạn có muốn làm một bài thực hành nhỏ dùng `docker-compose` + `logs` + `debug lỗi` không?
