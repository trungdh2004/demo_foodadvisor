/**
 * Test Strapi Email API Endpoints
 * 
 * Chạy script này sau khi Strapi server đã khởi động (yarn dev)
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:1447/api';

async function testSmtpConnection() {
  console.log('🔍 Testing SMTP Connection endpoint...');
  
  try {
    const response = await axios.get(`${BASE_URL}/test/smtp-connection`);
    console.log('✅ SMTP Connection test thành công!');
    console.log('📋 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ SMTP Connection test thất bại');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
    return false;
  }
}

async function testSendEmail() {
  console.log('\n📧 Testing Send Email endpoint...');
  
  try {
    const payload = {
      to: 'hieuhq.dev@gmail.com'
    };
    
    const response = await axios.post(`${BASE_URL}/test/send-email`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Send Email test thành công!');
    console.log('📋 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ Send Email test thất bại');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
    return false;
  }
}

async function testSendCustomEmail() {
  console.log('\n🎨 Testing Send Custom Email endpoint...');
  
  try {
    const payload = {
      to: 'hieuhq.dev@gmail.com',
      subject: '🎯 Custom Email từ Strapi API',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(45deg, #FF6B35, #F7931E); color: white; border-radius: 15px;">
          <h1 style="text-align: center;">🎯 Custom Email Test</h1>
          <p>Đây là email được gửi từ Strapi API endpoint <strong>/test/send-custom-email</strong></p>
          <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>✨ Features test thành công:</h3>
            <ul>
              <li>✅ Custom subject</li>
              <li>✅ Custom HTML content</li>
              <li>✅ Responsive design</li>
              <li>✅ API integration</li>
            </ul>
          </div>
          <p style="text-align: center; margin-top: 30px;">
            <strong>🚀 Strapi Email API hoạt động hoàn hảo!</strong>
          </p>
        </div>
      `,
      text: 'Đây là phiên bản text của custom email từ Strapi API.'
    };
    
    const response = await axios.post(`${BASE_URL}/test/send-custom-email`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Send Custom Email test thành công!');
    console.log('📋 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ Send Custom Email test thất bại');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.log(`   Error: ${error.message}`);
    }
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Bắt đầu test tất cả Email API endpoints...');
  console.log('==================================================\n');
  
  const test1 = await testSmtpConnection();
  const test2 = await testSendEmail();
  const test3 = await testSendCustomEmail();
  
  console.log('\n📊 KẾT QUẢ TỔNG KẾT:');
  console.log('===================');
  console.log(`SMTP Connection:    ${test1 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Send Email:         ${test2 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Send Custom Email:  ${test3 ? '✅ PASS' : '❌ FAIL'}`);
  
  const allPassed = test1 && test2 && test3;
  
  if (allPassed) {
    console.log('\n🎉 TẤT CẢ TESTS ĐỀU THÀNH CÔNG!');
    console.log('🎯 Strapi Email Service đã sẵn sàng sử dụng trong production!');
    console.log('\n📧 Kiểm tra email inbox để xem kết quả: hieuhq.dev@gmail.com');
  } else {
    console.log('\n⚠️  MỘT SỐ TESTS THẤT BẠI');
    console.log('🔧 Vui lòng kiểm tra Strapi server có đang chạy không:');
    console.log('   yarn dev');
    console.log('   Server should be running at: http://localhost:1447');
  }
}

// Chạy tests
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testSmtpConnection,
  testSendEmail,
  testSendCustomEmail,
  runAllTests
};