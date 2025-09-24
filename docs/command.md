| Thành phần        | Ý nghĩa                                                                            |
| ----------------- | ---------------------------------------------------------------------------------- |
| `docker run`      | Chạy một container                                                                 |
| `-it`             | Gồm 2 phần:<br>• `-i`: interactive (giữ STDIN mở)<br>• `-t`: tạo TTY (terminal ảo) |
| `--rm`            | Xoá container **ngay sau khi nó thoát**, không lưu lại trong `docker ps -a`        |
| `-v my-vol:/data` | Mount volume `my-vol` vào thư mục `/data` trong container                          |
| `alpine`          | Image nhẹ dùng để chạy nhanh, kiểm tra đơn giản(Alpine Linux⁠ is a Linux distribution built around musl libc⁠ and BusyBox⁠)|
| `sh`              | Chạy shell trong container (`sh` là shell cơ bản trong Alpine)                     |
