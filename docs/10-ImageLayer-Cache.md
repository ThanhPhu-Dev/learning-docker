Dưới đây là **Bài 10 – Docker Image Layer & Cache – Tối ưu hóa build time** trong series Docker của bạn:

---

## 🧱 Bài 10 – Docker Image Layer & Cache: Tối ưu Build Time

### 🎯 Mục tiêu:

* Hiểu cách Docker tạo image theo từng layer
* Biết cách tận dụng cache để tăng tốc độ build
* Viết Dockerfile hiệu quả hơn

---

## 1. 📦 Docker Image = nhiều **layer**

Khi bạn chạy `docker build`, Docker tạo image bằng cách chạy từng **dòng trong Dockerfile**, và mỗi dòng tạo ra một **layer** mới.

### Ví dụ:

```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]
```

→ Docker tạo các layer theo thứ tự:

1. `FROM node:18`
2. `WORKDIR /app`
3. `COPY package.json .`
4. `RUN npm install`
5. `COPY . .`
6. `CMD ...`

---

## 2. ⚡ Layer cache là gì?

Docker lưu cache cho từng layer.
Nếu Docker thấy dòng nào **không thay đổi**, nó sẽ **dùng lại cache**, không build lại từ đầu.

> Nếu bạn đổi 1 dòng ở giữa → các dòng sau sẽ bị **rebuild toàn bộ**

---

## 3. 🧠 Cách tối ưu thứ tự Dockerfile

**Quy tắc vàng**: đặt các dòng ít thay đổi **lên trên**, dòng hay thay đổi **xuống dưới**

### ❌ Không tối ưu:

```dockerfile
COPY . .
RUN npm install
```

→ Nếu có 1 file bất kỳ thay đổi, Docker phải copy toàn bộ, cache bị mất!

### ✅ Tối ưu:

```dockerfile
COPY package*.json ./
RUN npm install
COPY . .
```

→ Docker chỉ rebuild nếu bạn thay đổi `package.json`, còn lại giữ cache `npm install`

---

## 4. 🛠️ Demo hiệu quả cache

Lần 1: build lần đầu → sẽ mất thời gian
Lần 2: không thay đổi gì → build lại rất nhanh

```bash
docker build -t myapp .
```

→ Sau đó sửa 1 dòng trong code → rebuild
→ Docker chỉ rebuild từ bước `COPY . .` trở đi, `npm install` vẫn dùng cache!

---

## 5. 🔁 Multi-stage build (kết hợp)

Khi kết hợp với **multi-stage**, bạn có thể:

* Build code ở stage 1
* Copy file đã build sang stage 2 (image gọn hơn)
* Tận dụng cache ở từng stage

---

## 6. ✅ Tổng kết

| Khái niệm              | Ý nghĩa                                 |
| ---------------------- | --------------------------------------- |
| Layer                  | Mỗi dòng trong Dockerfile là 1 layer    |
| Cache                  | Docker lưu lại layer nếu không thay đổi |
| Tối ưu Dockerfile      | Đặt dòng ít thay đổi lên trên           |
| COPY + RUN npm install | Phải đặt riêng để tận dụng cache        |
| Multi-stage            | Build nhanh, image nhẹ hơn              |

---

Nếu bạn muốn mình phân tích Dockerfile thật của bạn và gợi ý cách tối ưu cache/build thì gửi nội dung lên nhé!


Docker sẽ **xóa cache (bỏ cache layer)** hoặc **bỏ qua cache khi build lại** trong các trường hợp sau:

---

## Khi nào Docker xóa hoặc không dùng cache layer?

### 1. **Thay đổi câu lệnh Dockerfile**

* Nếu một dòng (layer) trong Dockerfile bị thay đổi (vd: thay đổi nội dung câu lệnh RUN, COPY, ADD,...), Docker sẽ bỏ cache layer đó và tất cả các layer phía sau sẽ phải build lại.

### 2. **Thay đổi dữ liệu đầu vào của câu lệnh**

* Với các lệnh COPY, ADD:
  Nếu file hoặc thư mục được copy vào container thay đổi (ví dụ file `package.json` hay mã nguồn đổi), Docker sẽ bỏ cache cho layer đó và layer sau.

### 3. **Thay đổi base image**

* Nếu Dockerfile thay đổi dòng `FROM` (ví dụ từ `node:18` sang `node:19`), cache toàn bộ build sẽ bị bỏ vì base image khác.

### 4. **Sử dụng tùy chọn build không cache**

* Khi build Docker với lệnh:

  ```bash
  docker build --no-cache .
  ```

  Docker sẽ không sử dụng cache cho bất cứ layer nào, build hoàn toàn mới.

### 5. **Thay đổi biến môi trường hoặc ARG**

* Nếu có biến `ARG` hoặc `ENV` được dùng trong Dockerfile thay đổi giá trị, cache layer bị ảnh hưởng tương ứng.

### 6. **Cache hết hạn (hiếm xảy ra)**

* Docker đôi khi tự dọn dẹp cache (nhất là cache cũ không dùng đến) để giải phóng dung lượng, cache đó bị xóa nhưng không ảnh hưởng đến build hiện tại.

---

## Tóm tắt:

| Tình huống               | Cache bị bỏ hay không?         |
| ------------------------ | ------------------------------ |
| Thay đổi dòng Dockerfile | Bỏ cache từ layer đó trở xuống |
| Thay đổi file COPY/ADD   | Bỏ cache ở layer chứa COPY/ADD |
| Thay đổi base image      | Bỏ cache toàn bộ               |
| Build với `--no-cache`   | Không dùng cache               |
| Thay đổi ARG/ENV         | Bỏ cache layer bị ảnh hưởng    |

---

Nếu bạn muốn, mình có thể giúp bạn kiểm tra Dockerfile hoặc cách tổ chức để tận dụng cache tốt nhất!
