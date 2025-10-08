'use strict';

const nodemailer = require('nodemailer');

/**
 * Email service
 */

module.exports = {
  /**
   * Tạo SMTP transporter cho Gmail
   */
  createGmailTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hieuhq.dev@gmail.com', 
        pass: 'slxnaufvzphkxsjm'    // App password bạn đã cung cấp
      }
    });
  },

  /**
   * Gửi email test
   */
  async sendTestEmail(to, subject = 'Test Email from Strapi', htmlContent = null) {
    try {
      const transporter = this.createGmailTransporter();
      
      const mailOptions = {
        from: '"Strapi Test" <hieuhq.dev@gmail.com>', // Thay bằng email của bạn
        to: to,
        subject: subject,
        html: htmlContent || `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4F46E5;">🎉 Test Email từ Strapi</h1>
            <p>Xin chào!</p>
            <p>Đây là email test được gửi từ Strapi API sử dụng Gmail SMTP.</p>
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Thông tin kỹ thuật:</h3>
              <ul>
                <li><strong>Thời gian gửi:</strong> ${new Date().toLocaleString('vi-VN')}</li>
                <li><strong>Service:</strong> Gmail SMTP</li>
                <li><strong>Framework:</strong> Strapi</li>
                <li><strong>Library:</strong> Nodemailer</li>
              </ul>
            </div>
            <p>Nếu bạn nhận được email này, nghĩa là cấu hình SMTP đã hoạt động thành công! ✅</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
            <p style="color: #6B7280; font-size: 12px;">
              Email này được gửi tự động từ hệ thống test. Vui lòng không reply.
            </p>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
        envelope: info.envelope
      };
    } catch (error) {
      console.error('Lỗi khi gửi email:', error);
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  /**
   * Gửi email với nội dung tùy chỉnh
   */
  async sendCustomEmail(options) {
    try {
      const transporter = this.createGmailTransporter();
      
      const mailOptions = {
        from: options.from || '"Strapi" <hieuhq.dev@gmail.com>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments
      };

      const info = await transporter.sendMail(mailOptions);
      
      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };
    } catch (error) {
      console.error('Lỗi khi gửi email tùy chỉnh:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};