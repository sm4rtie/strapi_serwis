'use strict';

/**
 * Email.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */
 const _ = require('lodash');
 const mailgun = require('mailgun-js')({apiKey: 'key-62c44e32fab3bc91c0aa3a98519efaa0', domain: 'sandbox8141963361f44deb916d5c1ee0d23cd0.mailgun.org'});

 module.exports = {
 send: (options, cb) => {
   var data = {
  from: options.from || '"Administration Panel" <no-reply@strapi.io>',
  to: 'marta.jareckaa@gmail.com',
  subject: options.subject,
  text: options.text,
  html: options.html
};
mailgun.messages().send(data, function (error, body) {
  console.log(body);

});
 }
 }

/*const _ = require('lodash');
const sendmail = require('sendmail')({
  silent: false // bylo true
});

module.exports = {
  send: (options, cb) => {
    return new Promise((resolve, reject) => {
      // Default values.
      options = _.isObject(options) ? options : {};
      options.from = options.from || '"Administration Panel" <no-reply@strapi.io>';
      options.text = options.text || options.html;
      options.html = options.html || options.text;

      // Send the email.
      sendmail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      }, function (err) {
        if (err) {
          reject([{ messages: [{ id: 'Auth.form.error.email.invalid' }] }]);
        } else {
          resolve();
        }
      });
    });
  }
};*/
