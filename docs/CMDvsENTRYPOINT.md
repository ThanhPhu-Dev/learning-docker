Dưới đây là sự khác biệt chính giữa **CMD** và **ENTRYPOINT** trong Dockerfile:

---

## CMD vs ENTRYPOINT

| Tiêu chí                     | CMD                                                 | ENTRYPOINT                                                  |
| ---------------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| **Mục đích**                 | Đặt lệnh mặc định để chạy container                 | Đặt lệnh **chính** mà container sẽ chạy                     |
| **Có thể bị ghi đè**         | Có thể bị ghi đè bằng tham số khi chạy `docker run` | Tham số khi chạy `docker run` được thêm vào lệnh ENTRYPOINT |
| **Cú pháp**                  | Có thể là exec form hoặc shell form                 | Thường dùng exec form (khuyến khích)                        |
| **Ví dụ khi chạy**           | `docker run image echo hi` sẽ thay thế CMD          | `docker run image param` sẽ thêm `param` vào ENTRYPOINT     |
| **Kết hợp CMD & ENTRYPOINT** | CMD cung cấp tham số mặc định cho ENTRYPOINT nếu có | ENTRYPOINT luôn được chạy, CMD truyền tham số mặc định      |

---

## Ví dụ cụ thể

Dockerfile:

```dockerfile
ENTRYPOINT ["echo"]
CMD ["Hello World"]
```

* Chạy `docker run image` → in ra: `Hello World`
* Chạy `docker run image "Hi there"` → in ra: `Hi there` (CMD bị ghi đè thành tham số của ENTRYPOINT)

---

Nếu chỉ dùng CMD:

```dockerfile
CMD ["echo", "Hello World"]
```

* Chạy `docker run image` → in ra: `Hello World`
* Chạy `docker run image "Hi there"` → in ra: `Hi there` (CMD bị thay thế hoàn toàn)

---

## Tóm lại

* **ENTRYPOINT:** Định nghĩa lệnh cố định, container luôn chạy lệnh đó
* **CMD:** Định nghĩa tham số mặc định hoặc lệnh, có thể bị ghi đè khi chạy container

Bạn muốn mình giúp bạn viết Dockerfile mẫu dùng CMD & ENTRYPOINT phối hợp không?
