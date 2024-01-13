const nodemailer= require('nodemailer');
const Constants=require('../config/constants');
const transporter = nodemailer.createTransport(Constants.mailer.options);

/**    
 * @mail options is used for gmail or any mail details also for file attach
 */
exports.mailOptions = (from = '', to, subject, text, html, pdf, cc) => {
  let obj = {
    from,
    to,
    subject,
    text,
    html,
    cc,
  };
  if (pdf) {
    obj.attachments = pdf;
  }
  return obj;
};

/**     
 * @send this functions is used for sending an email
 */
exports.sendEmail = async (options, cb) => {
  let from = Constants.mailer.fromName;
  if (options.from) from = options.from;
  if (process.env.NODE_ENV === 'development') options.to = options.to; 
  options.from = from + ' <' + Constants.mailer.from + '>';
  transporter.sendMail(options, (error, info) => {
    if (error) {
      cb(error, info);
    }
    transporter.close();
  });
};