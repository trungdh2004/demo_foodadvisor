'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/test/send-email',
      handler: 'test.sendTestEmail',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      }
    },
    {
      method: 'POST', 
      path: '/test/send-custom-email',
      handler: 'test.sendCustomEmail',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/test/smtp-connection',
      handler: 'test.testSmtpConnection',
      config: {
        policies: [],
        middlewares: [],
        auth: false
      }
    }
  ]
};