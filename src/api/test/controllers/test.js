'use strict';

/**
 * test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const emailService = require('../services/email');

module.exports = createCoreController('api::test.test', ({ strapi }) => ({
  // Endpoint test gửi email cơ bản
  async sendTestEmail(ctx) {
    try {
      const { to } = ctx.request.body;
      
      if (!to) {
        return ctx.badRequest('Vui lòng cung cấp địa chỉ email người nhận (to)');
      }

      const result = await emailService.sendTestEmail(to);

      if (result.success) {
        ctx.send({
          success: true,
          message: 'Email đã được gửi thành công!',
          messageId: result.messageId,
          data: result
        });
      } else {
        ctx.send({
          success: false,
          message: 'Có lỗi khi gửi email',
          error: result.error
        }, 500);
      }
    } catch (error) {
      console.error('Lỗi trong controller sendTestEmail:', error);
      ctx.send({
        success: false,
        message: 'Lỗi server',
        error: error.message
      }, 500);
    }
  },

  // Endpoint gửi email tùy chỉnh
  async sendCustomEmail(ctx) {
    try {
      const { to, subject, html, text, from } = ctx.request.body;
      
      if (!to || (!html && !text)) {
        return ctx.badRequest('Vui lòng cung cấp: to (người nhận) và html hoặc text (nội dung)');
      }

      const emailOptions = {
        to,
        subject: subject || 'Email từ Strapi',
        html,
        text,
        from
      };

      const result = await emailService.sendCustomEmail(emailOptions);

      if (result.success) {
        ctx.send({
          success: true,
          message: 'Email tùy chỉnh đã được gửi thành công!',
          messageId: result.messageId,
          data: result
        });
      } else {
        ctx.send({
          success: false,
          message: 'Có lỗi khi gửi email tùy chỉnh',
          error: result.error
        }, 500);
      }
    } catch (error) {
      console.error('Lỗi trong controller sendCustomEmail:', error);
      ctx.send({
        success: false,
        message: 'Lỗi server',
        error: error.message
      }, 500);
    }
  },

  // Endpoint test kết nối SMTP
  async testSmtpConnection(ctx) {
    try {
      const emailTransporter = emailService.createGmailTransporter();
      
      // Verify connection
      const isConnected = await emailTransporter.verify();
      
      if (isConnected) {
        ctx.send({
          success: true,
          message: 'Kết nối SMTP Gmail thành công! ✅',
          connectionStatus: 'connected'
        });
      } else {
        ctx.send({
          success: false,
          message: 'Không thể kết nối đến SMTP Gmail ❌',
          connectionStatus: 'failed'
        }, 500);
      }
    } catch (error) {
      console.error('Lỗi kết nối SMTP:', error);
      ctx.send({
        success: false,
        message: 'Lỗi khi test kết nối SMTP',
        error: error.message,
        connectionStatus: 'error'
      }, 500);
    }
  }
}));
