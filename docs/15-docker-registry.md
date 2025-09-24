Cảm ơn bạn đã nhắc! Ta sẽ tiếp tục với **Docker Bài 15: Docker Registry & Deployment Strategy** – đây là bài học rất thực tế, giúp bạn hiểu rõ hơn về cách **quản lý image, triển khai lên server**, và **đảm bảo an toàn khi phân phối sản phẩm**.

---

## 🚀 Bài 15: Docker Registry & Deployment Strategy

### 🎯 Mục tiêu

* Hiểu về Docker Registry (công khai & riêng tư).
* Biết cách triển khai ứng dụng qua Docker image.
* Áp dụng chiến lược triển khai hiệu quả & an toàn.

---

## 1. 🧱 Docker Registry là gì?

Docker Registry là nơi lưu trữ Docker images, giống như GitHub lưu code.

### 2 loại phổ biến:

* **Docker Hub** (public/private)
* **Private Docker Registry** (tự host)

Bạn đã học phần cơ bản và bảo mật rồi, giờ ta sẽ học **chiến lược triển khai**.

---

## 2. 🚀 Các Chiến lược triển khai (Deployment Strategies)

Dưới đây là các phương pháp phổ biến để **triển khai sản phẩm bằng Docker**:

### ✅ Chiến lược 1: **Pull trực tiếp từ Registry**

1. Push image từ local lên registry:

   ```bash
   docker tag myapp registry.com/myapp:v1
   docker push registry.com/myapp:v1
   ```

2. Trên server:

   ```bash
   docker pull registry.com/myapp:v1
   docker run -d --name app -p 80:80 registry.com/myapp:v1
   ```

> **Ưu điểm:** đơn giản, dễ kiểm soát.
> **Nhược điểm:** cần mở registry và có quyền truy cập.

---

### ✅ Chiến lược 2: **CI/CD Pipeline tự động**

Dùng GitHub Actions / GitLab CI / Jenkins để:

* Build image
* Push lên registry
* SSH vào server và deploy

> Đây là cách chuyên nghiệp và phổ biến nhất.

Ví dụ GitHub Actions (trích đoạn):

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Build image
        run: docker build -t registry.com/myapp:${{ github.sha }} .

      - name: Push image
        run: docker push registry.com/myapp:${{ github.sha }}

      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: root
          key: ${{ secrets.SSH_KEY }}
          script: |
            docker pull registry.com/myapp:${{ github.sha }}
            docker stop app || true
            docker rm app || true
            docker run -d --name app -p 80:80 registry.com/myapp:${{ github.sha }}
```

> **Ưu điểm:** tự động hóa hoàn toàn.
> **Nhược điểm:** cần cấu hình CI/CD ban đầu.

---

### ✅ Chiến lược 3: **Chuyển image qua file `.tar`**

1. Trên local:

   ```bash
   docker save -o myapp.tar myapp
   scp myapp.tar user@server:~/myapp.tar
   ```

2. Trên server:

   ```bash
   docker load -i myapp.tar
   docker run -d -p 80:80 myapp
   ```

> **Ưu điểm:** không cần registry.
> **Nhược điểm:** thủ công, không linh hoạt.

---

## 3. 📦 Tagging Strategy (Chiến lược đặt tên phiên bản)

* `latest` → Dành cho bản mặc định
* `v1.0.0`, `v1.0.1` → Cho từng bản release
* `feature-xyz` → Cho bản dev/test

### Lưu ý:

Không nên **luôn push `latest`**, vì dễ gây nhầm lẫn giữa các phiên bản.

---

## 4. ✅ Tổng kết bài 15

| Nội dung              | Ghi chú                                |
| --------------------- | -------------------------------------- |
| Docker Registry       | Trung tâm lưu image                    |
| Chiến lược triển khai | Pull trực tiếp, CI/CD, hoặc .tar       |
| Registry bảo mật      | Dùng HTTPS + Basic Auth + IP filtering |
| Gắn tag phiên bản     | Quản lý release rõ ràng và an toàn     |

---

## 📚 Bài tiếp theo: **Bài 16 – Docker trong Production**

Chúng ta sẽ học:

* Giám sát container
* Tự restart khi fail
* Healthcheck và Logging nâng cao

---

Bạn muốn học tiếp bài 16 luôn chứ? Hay muốn thử triển khai một image theo chiến lược nào ở trên để thực hành?
