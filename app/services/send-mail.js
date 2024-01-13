const { mailOptions, sendEmail }=require( './node-mailer');
const fs = require('fs');
const moment = require('moment');
const util = require('util');
require('util.promisify').shim();
const readFile = util.promisify(fs.readFile);

exports.sendUserBasicCredentials = async (userBasic, password, cb) => {
  let result;
  let subject = 'Your UserBasic Details';
  try {
    result = await readFile(__dirname + '/../views/userBasic.pdf.html', 'utf8');
    result = result.replace('{{name}}', userBasic.name);
    result = result.replace('{{place}}', userBasic.place);
    result = result.replace('{{email}}', userBasic.email);
    result = result.replace('{{phone}}', userBasic.phone);
    result = result.replace('{{userBasic.userBasicID}}', userBasic.userBasicID);
    result = result.replace('{{userBasic._id}}', userBasic._id);
    result = result.replace('{{createdAt}}', userBasic.createdAt);
    result = result.replace('{{currentDate}}', moment().format('YYYY'));
    const options = mailOptions(null, userBasic.email, subject, result, result);
    sendEmail(options, cb);
  } catch (e) {
    console.log(e);
  }
};