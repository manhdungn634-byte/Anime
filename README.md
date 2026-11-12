# AnimeVietsub Web

Website frontend tĩnh, responsive cho desktop và điện thoại. Không cần cài thư viện.

## Chạy thử
- Mở `index.html` bằng trình duyệt, hoặc chạy local server:
  `python3 -m http.server 8000`
- Truy cập `http://localhost:8000`

## Tính năng demo
- Trang chủ, tìm kiếm, lọc thể loại.
- Trang chi tiết anime mẫu.
- Danh sách yêu thích lưu bằng localStorage.
- Responsive cho màn hình điện thoại.

## Kết nối dữ liệu thật
Hiện tại website dùng dữ liệu minh họa. Để đưa phim/tập/video thật vào, cần API hoặc nguồn nội dung được cấp quyền, có schema rõ ràng và CORS phù hợp. Không có chức năng trích xuất hay vượt bảo vệ luồng phim từ website bên thứ ba.

## Triển khai
Có thể tải thư mục này lên hosting tĩnh như GitHub Pages, Netlify hoặc Vercel. Nếu triển khai công khai, hãy thay nội dung mẫu và bổ sung chính sách quyền riêng tư/điều khoản sử dụng.
