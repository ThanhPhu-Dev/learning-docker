Tuyệt vời, ta cùng bước vào **Bài 17 – Docker Swarm: Orchestration cơ bản** – đây là bước đầu tiên để bạn **quản lý nhiều container** như một hệ thống phân tán, có thể tự **scale, cân bằng tải và cập nhật không gián đoạn**.

---

## 🚀 Bài 17 – Docker Swarm cơ bản: Orchestration cho Container

### 🎯 Mục tiêu:

* Hiểu Docker Swarm là gì
* Tạo cluster Swarm nhiều node
* Triển khai dịch vụ có khả năng scale, rolling update
* Cân bằng tải (Load Balancing)

---

## 1. 🧠 Docker Swarm là gì?

> Docker Swarm là hệ thống **orchestration** tích hợp sẵn trong Docker, giúp bạn quản lý **nhiều container, nhiều server (nodes)** một cách tự động.

### ⚙️ So sánh:

| Docker cơ bản                | Docker Swarm                |
| ---------------------------- | --------------------------- |
| Quản lý 1 container          | Quản lý hàng trăm container |
| Thủ công khởi động container | Tự động quản lý lifecycle   |
| Không scale tự động          | Có scale, rolling update    |
| Không cân bằng tải           | Có load balancing sẵn       |

---

## 2. 🧱 Các thành phần chính của Swarm

| Thành phần       | Vai trò                               |
| ---------------- | ------------------------------------- |
| **Manager Node** | Quản lý cluster, quyết định phân công |
| **Worker Node**  | Nhận lệnh từ manager, chạy container  |
| **Service**      | Một nhóm container giống nhau (task)  |
| **Stack**        | Tập hợp nhiều service chạy cùng nhau  |

---

## 3. ⚙️ Bắt đầu với Swarm Mode

### Bước 1: Khởi tạo cluster

```bash
docker swarm init --advertise-addr <MANAGER-IP>
```

> Sau khi init xong, Docker chuyển sang chế độ Swarm. Bạn sẽ nhận được lệnh để thêm Worker:

```bash
docker swarm join --token ... <MANAGER-IP>:2377
```

### Bước 2: Kiểm tra node trong cluster

```bash
docker node ls
```

---

## 4. 🧩 Tạo Service (thay vì `docker run`)

```bash
docker service create \
  --name web \
  --replicas 3 \
  -p 80:80 \
  nginx
```

> Swarm sẽ tự động tạo 3 container (task) và phân bố lên các nodes trong cluster.

### Kiểm tra:

```bash
docker service ls
docker service ps web
```

---

## 5. 🔁 Scale và cập nhật dịch vụ

### Tăng/giảm số lượng:

```bash
docker service scale web=5
```

### Cập nhật image:

```bash
docker service update --image nginx:alpine web
```

> Mặc định Swarm sẽ cập nhật theo rolling update, không down toàn bộ cùng lúc.

---

## 6. 🔄 Rolling Update và Rollback

### Update kèm rollback:

```bash
docker service update --image myapp:v2 --update-failure-action rollback myapp
```

> Nếu update lỗi, Swarm sẽ **tự rollback** về phiên bản cũ.

---

## 7. 🔀 Load Balancing nội bộ

Swarm gắn mỗi service 1 **Virtual IP** và phân phối request tự động giữa các container thông qua DNS nội bộ.

> Ví dụ: Gửi request đến `web:80` sẽ được Swarm chia đều các replica.

---

## 8. 💡 Bonus: Deploy qua docker-compose

Bạn có thể dùng file `docker-compose.yml` và chạy:

```bash
docker stack deploy -c docker-compose.yml mystack
```

> `stack` là đơn vị quản lý cao hơn `service`.

---

## ✅ Tổng kết bài 17

| Nội dung                        | Ghi nhớ                             |
| ------------------------------- | ----------------------------------- |
| Docker Swarm                    | Orchestration tích hợp trong Docker |
| Manager/Worker                  | Quản lý & thực thi container        |
| `docker service create`         | Thay thế `docker run` trong Swarm   |
| Scale, Rolling update, Rollback | Có sẵn và dễ dùng                   |
| Load Balancing nội bộ           | Tự động, không cần Nginx            |

---

## 📚 Bài tiếp theo – **Bài 18: Docker Swarm vs Kubernetes**

Trong bài này bạn sẽ hiểu:

* Khi nào dùng Swarm, khi nào dùng Kubernetes
* So sánh ưu/nhược điểm của từng nền tảng
* Lựa chọn phù hợp cho team nhỏ, startup, hay hệ thống lớn

---

Bạn muốn học tiếp bài cuối cùng luôn chứ?
