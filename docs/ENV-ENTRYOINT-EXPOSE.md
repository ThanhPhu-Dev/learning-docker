Dưới đây là giải thích ngắn gọn và dễ hiểu về 3 từ khóa **ENV, ENTRYPOINT, EXPOSE** trong Dockerfile:

---

## 1. `ENV`

* **Mục đích:** Đặt biến môi trường (environment variables) bên trong container.
* **Cách dùng:**

  ```dockerfile
  ENV <key>=<value>
  ```
* **Ví dụ:**

  ```dockerfile
  ENV NODE_ENV=production
  ```
* **Ý nghĩa:**
  Các biến này có thể được chương trình trong container sử dụng để cấu hình hành vi (ví dụ: môi trường dev hay production).

---

## 2. `ENTRYPOINT`

* **Mục đích:** Xác định **lệnh chính** hoặc **chương trình** mà container sẽ chạy khi khởi động.
* **Cách dùng:**
  Có 2 dạng phổ biến:

  * Exec form (khuyên dùng):

    ```dockerfile
    ENTRYPOINT ["executable", "param1", "param2"]
    ```
  * Shell form:

    ```dockerfile
    ENTRYPOINT command param1 param2
    ```
* **Ví dụ:**

  ```dockerfile
  ENTRYPOINT ["python", "app.py"]
  ```
* **Ý nghĩa:**
  ENTRYPOINT giúp container hoạt động như một chương trình duy nhất, bất kể các tham số `docker run` truyền vào.

---

## 3. `EXPOSE`

* **Mục đích:** Thông báo **cổng** mà container sẽ lắng nghe (dùng để giao tiếp với bên ngoài).
* **Cách dùng:**

  ```dockerfile
  EXPOSE <port>
  ```
* **Ví dụ:**

  ```dockerfile
  EXPOSE 80
  ```
* **Lưu ý:**

  * `EXPOSE` chỉ là **một chỉ dẫn metadata**, không mở cổng thực tế trên host.
  * Để truy cập container qua cổng đó, cần dùng `-p` hoặc `--publish` khi chạy container, ví dụ:

    ```bash
    docker run -p 8080:80 <image>
    ```
* **Ý nghĩa:**
  Giúp các dev hoặc công cụ biết container dùng cổng nào để giao tiếp.

---

Nếu bạn muốn, mình có thể giải thích thêm về sự khác biệt giữa `CMD` và `ENTRYPOINT`, hoặc cách dùng biến ENV hiệu quả trong Dockerfile nhé!
