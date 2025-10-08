/**
 * Gmail SMTP Debug Script
 * Script này sẽ giúp debug vấn đề kết nối Gmail SMTP
 */

const nodemailer = require('nodemailer');

console.log('🔧 Gmail SMTP Debug Script');
console.log('==========================\n');

// Thông tin cấu hình hiện tại
const emailConfig = {
  user: 'hieuhq.dev@gmail.com',
  pass: 'slxn aufv zphk xsjm'
};

console.log('📋 Thông tin cấu hình hiện tại:');
console.log(`   Email: ${emailConfig.user}`);
console.log(`   App Password: ${emailConfig.pass.replace(/./g, '*')}`);
console.log('');

// Test 1: Cấu hình cơ bản với Gmail service
async function testBasicGmailConfig() {
  console.log('🧪 Test 1: Cấu hình Gmail service cơ bản...');
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      }
    });

    const result = await transporter.verify();
    console.log('✅ Test 1: THÀNH CÔNG - Gmail service config hoạt động!');
    return true;
  } catch (error) {
    console.log('❌ Test 1: THẤT BẠI');
    console.log(`   Lỗi: ${error.message}`);
    return false;
  }
}

// Test 2: Cấu hình SMTP trực tiếp
async function testDirectSmtpConfig() {
  console.log('\n🧪 Test 2: Cấu hình SMTP trực tiếp...');
  
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const result = await transporter.verify();
    console.log('✅ Test 2: THÀNH CÔNG - SMTP trực tiếp hoạt động!');
    return true;
  } catch (error) {
    console.log('❌ Test 2: THẤT BẠI');
    console.log(`   Lỗi: ${error.message}`);
    return false;
  }
}

// Test 3: Cấu hình SMTP với SSL
async function testSslSmtpConfig() {
  console.log('\n🧪 Test 3: Cấu hình SMTP với SSL...');
  
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      }
    });

    const result = await transporter.verify();
    console.log('✅ Test 3: THÀNH CÔNG - SMTP SSL hoạt động!');
    return true;
  } catch (error) {
    console.log('❌ Test 3: THẤT BẠI');
    console.log(`   Lỗi: ${error.message}`);
    return false;
  }
}

// Hàm chính
async function runDiagnostics() {
  console.log('🚀 Bắt đầu chẩn đoán kết nối Gmail SMTP...\n');
  
  const test1 = await testBasicGmailConfig();
  const test2 = await testDirectSmtpConfig();
  const test3 = await testSslSmtpConfig();
  
  console.log('\n📊 KẾT QUẢ CHẨN ĐOÁN:');
  console.log('======================');
  console.log(`Test 1 (Gmail Service): ${test1 ? '✅ OK' : '❌ FAIL'}`);
  console.log(`Test 2 (SMTP Direct):   ${test2 ? '✅ OK' : '❌ FAIL'}`);
  console.log(`Test 3 (SMTP SSL):      ${test3 ? '✅ OK' : '❌ FAIL'}`);
  
  if (!test1 && !test2 && !test3) {
    console.log('\n❌ TẤT CẢ TESTS ĐỀU THẤT BẠI!');
    console.log('\n🔧 KHUYẾN NGHỊ KHẮC PHỤC:');
    console.log('1. Kiểm tra email có đúng không: hieuhq.dev@gmail.com');
    console.log('2. Tạo lại App Password mới:');
    console.log('   - Vào Google Account → Security → 2-Step Verification');
    console.log('   - Tìm "App passwords" → Generate new app password');
    console.log('   - Chọn "Mail" làm app type');
    console.log('3. Đảm bảo 2-Step Verification đã được bật');
    console.log('4. Thử đăng nhập Gmail qua web để kiểm tra account');
    console.log('5. Kiểm tra không có ký tự đặc biệt trong app password');
  } else {
    console.log('\n✅ CÓ ÍT NHẤT 1 CÁCH KÊẾT NỐI HOẠT ĐỘNG!');
    console.log('   Bạn có thể sử dụng cấu hình đã pass test.');
  }
  
  console.log('\n📝 Ghi chú: App password hiện tại có dấu cách.');
  console.log('   Thử loại bỏ dấu cách: slxnaufvzphkxsjm');
}

// Chạy script
if (require.main === module) {
  runDiagnostics().catch(console.error);
}

module.exports = { runDiagnostics };