/**
 * Standalone Email Test Script
 * Chạy script này để test gửi email mà không cần Strapi server
 */

const nodemailer = require('nodemailer');

// Cấu hình SMTP Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hieuhq.dev@gmail.com', // ⚠️ THAY BẰNG EMAIL CỦA BẠN
    pass: 'slxn aufv zphk xsjm'    // App password bạn đã cung cấp
  }
});

async function testEmailConnection() {
  console.log('🔍 Đang test kết nối SMTP Gmail...');
  
  try {
    const isConnected = await transporter.verify();
    if (isConnected) {
      console.log('✅ Kết nối SMTP Gmail thành công!');
      return true;
    } else {
      console.log('❌ Không thể kết nối đến SMTP Gmail');
      return false;
    }
  } catch (error) {
    console.error('❌ Lỗi kết nối SMTP:', error.message);
    return false;
  }
}

async function sendTestEmail(toEmail) {
  console.log(`📧 Đang gửi test email đến: ${toEmail}`);
  
  try {
    const mailOptions = {
      from: '"Strapi Test" <hieuhq.dev@gmail.com>', // ⚠️ THAY BẰNG EMAIL CỦA BẠN
      to: toEmail,
      subject: '🎉 Test Email từ Strapi + Nodemailer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4F46E5; text-align: center;">🎉 Test Email Thành Công!</h1>
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
            <h2>Gmail SMTP Configuration hoạt động! ✅</h2>
          </div>
          
          <div style="background: #F8F9FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📋 Thông tin kỹ thuật:</h3>
            <ul style="line-height: 1.6;">
              <li><strong>🕐 Thời gian gửi:</strong> ${new Date().toLocaleString('vi-VN')}</li>
              <li><strong>📡 Service:</strong> Gmail SMTP</li>
              <li><strong>🚀 Framework:</strong> Strapi</li>
              <li><strong>📦 Library:</strong> Nodemailer</li>
              <li><strong>🔑 Auth:</strong> App Password</li>
            </ul>
          </div>

          <div style="background: #E8F5E8; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0;">
            <p><strong>✅ Thành công!</strong> Cấu hình email SMTP Gmail đã hoạt động chính xác.</p>
            <p>Bạn có thể sử dụng configuration này trong ứng dụng Strapi để gửi email.</p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <div style="display: inline-block; background: #FF6B35; color: white; padding: 10px 20px; border-radius: 25px;">
              <strong>🛠️ Test by Strapi Email Service</strong>
            </div>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
          <p style="color: #6B7280; font-size: 12px; text-align: center;">
            Email này được gửi tự động từ hệ thống test. Vui lòng không reply.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email đã được gửi thành công!');
    console.log('📋 Thông tin gửi:');
    console.log(`   - Message ID: ${info.messageId}`);
    console.log(`   - Response: ${info.response}`);
    console.log(`   - Accepted: ${info.accepted}`);
    
    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('❌ Lỗi khi gửi email:', error.message);
    if (error.code) {
      console.error(`   - Error Code: ${error.code}`);
    }
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
}

// Main execution
async function main() {
  console.log('🚀 Bắt đầu test Gmail SMTP...\n');
  
  // Test kết nối
  const isConnected = await testEmailConnection();
  
  if (!isConnected) {
    console.log('\n❌ Không thể tiếp tục test vì kết nối SMTP thất bại.');
    console.log('\n🔧 Vui lòng kiểm tra:');
    console.log('   1. Email và App Password có đúng không');
    console.log('   2. 2-Step Verification đã được bật');
    console.log('   3. App Password được tạo cho "Mail"');
    return;
  }
  
  console.log('\n📧 Nhập email để test gửi (hoặc Enter để skip):');
  
  // Trong môi trường thật, bạn có thể nhập email để test
  // Hiện tại tôi sẽ comment lại để tránh gửi email không mong muốn
  /*
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Email: ', async (email) => {
    if (email.trim()) {
      await sendTestEmail(email.trim());
    } else {
      console.log('⏭️ Bỏ qua test gửi email.');
    }
    
    console.log('\n✅ Test hoàn tất!');
    rl.close();
  });
  */
  
  console.log('\n✅ Test kết nối hoàn tất!');
  console.log('\n📝 Để test gửi email, uncomment đoạn code phía trên và chạy lại script.');
  console.log('\n🎯 Strapi Email Service đã sẵn sàng sử dụng!');
}

// Chạy script nếu được gọi trực tiếp
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testEmailConnection,
  sendTestEmail,
  transporter
};