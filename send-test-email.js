/**
 * Test gửi email thực tế
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hieuhq.dev@gmail.com',
    pass: 'slxnaufvzphkxsjm'
  }
});

async function sendTestEmail() {
  console.log('📧 Đang gửi test email...');
  
  try {
    const mailOptions = {
      from: '"Strapi Test" <hieuhq.dev@gmail.com>',
      to: 'hieuhq.dev@gmail.com', // Gửi cho chính mình để test
      subject: '🎉 Test Email từ Strapi + Nodemailer - THÀNH CÔNG!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 15px;">
          <h1 style="text-align: center; margin: 0 0 20px 0;">🎉 CHÚC MỪNG!</h1>
          <h2 style="text-align: center; margin: 0 0 30px 0;">Gmail SMTP Configuration Hoạt Động Hoàn Hảo! ✅</h2>
          
          <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3>📋 Thông tin kỹ thuật:</h3>
            <ul style="line-height: 1.8;">
              <li><strong>🕐 Thời gian gửi:</strong> ${new Date().toLocaleString('vi-VN')}</li>
              <li><strong>📡 Service:</strong> Gmail SMTP</li>
              <li><strong>🚀 Framework:</strong> Strapi</li>
              <li><strong>📦 Library:</strong> Nodemailer</li>
              <li><strong>🔑 Auth:</strong> App Password</li>
              <li><strong>📧 Email:</strong> hieuhq.dev@gmail.com</li>
            </ul>
          </div>

          <div style="background: rgba(76, 175, 80, 0.2); border: 2px solid #4CAF50; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">✅ Kết quả:</h3>
            <p style="margin: 0; font-size: 16px;"><strong>THÀNH CÔNG!</strong> Hệ thống email đã được cấu hình đúng và hoạt động tốt.</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 25px; border: 2px solid rgba(255,255,255,0.3);">
              <strong>🛠️ Powered by Strapi Email Service</strong>
            </div>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid rgba(255,255,255,0.2);">
          <p style="text-align: center; font-size: 12px; opacity: 0.8;">
            Email này được gửi tự động từ hệ thống test Strapi. 
            <br>Bạn có thể bắt đầu sử dụng API email endpoints ngay bây giờ!
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email đã được gửi thành công!');
    console.log('📋 Chi tiết:');
    console.log(`   - Message ID: ${info.messageId}`);
    console.log(`   - Response: ${info.response}`);
    console.log(`   - Người nhận: ${info.accepted}`);
    console.log(`   - Bị từ chối: ${info.rejected}`);
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Kiểm tra email inbox (hieuhq.dev@gmail.com)');
    console.log('2. Start Strapi server: yarn dev');
    console.log('3. Test API endpoints:');
    console.log('   GET  http://localhost:1447/api/test/smtp-connection');
    console.log('   POST http://localhost:1447/api/test/send-email');
    
    return info;
  } catch (error) {
    console.error('❌ Lỗi khi gửi email:', error.message);
    return null;
  }
}

// Chạy test
if (require.main === module) {
  sendTestEmail().catch(console.error);
}

module.exports = { sendTestEmail };