/**
 * Test Email Functionality
 * 
 * Hướng dẫn sử dụng:
 * 1. Cập nhật email của bạn trong file src/api/test/services/email.js
 * 2. Chạy server: yarn dev
 * 3. Test các endpoint bên dưới
 */

// =============================================================================
// 1. Test kết nối SMTP
// =============================================================================
/*
curl -X GET "http://localhost:1447/api/test/smtp-connection"
*/

// =============================================================================
// 2. Gửi email test đơn giản
// =============================================================================
/*
curl -X POST "http://localhost:1447/api/test/send-email" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com"
  }'
*/

// =============================================================================
// 3. Gửi email với nội dung tùy chỉnh
// =============================================================================
/*
curl -X POST "http://localhost:1447/api/test/send-custom-email" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Email tùy chỉnh từ Strapi",
    "html": "<h1>Xin chào!</h1><p>Đây là email tùy chỉnh với HTML.</p>",
    "text": "Xin chào! Đây là email tùy chỉnh dạng text."
  }'
*/

// =============================================================================
// HƯỚNG DẪN SETUP GMAIL APP PASSWORD:
// =============================================================================
/*
1. Truy cập Google Account: https://myaccount.google.com/
2. Vào Security → 2-Step Verification (bật nếu chưa có)
3. Trong 2-Step Verification, tìm "App passwords"
4. Tạo app password mới cho "Mail"
5. Sử dụng password này thay vì password thường

Thông tin cần thay đổi trong src/api/test/services/email.js:
- Line 15: user: 'your-email@gmail.com'
- Line 16: pass: 'your-app-password'
- Line 26: from: '"Your Name" <your-email@gmail.com>'
- Line 67: from: options.from || '"Your Name" <your-email@gmail.com>'
*/

module.exports = {
  info: 'Email test setup completed successfully! 🎉'
};