const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const mailConfig = require('../config/mail.js')
const { host, port, user, pass } = mailConfig.mail; 
const transport = nodemailer.createTransport({
    host,
    port,
    auth: {user,pass},
  });
  const handlebarOptions = {
    viewEngine:{
      extName:'.html',
      partialsDir: path.resolve('./src/resources/mail/'),
      layoutsDir: path.resolve('./src/resources/mail/'),
      defaultLayout: "",
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName:'.html',
  }
  transport.use('compile',hbs(handlebarOptions));
module.exports = transport;
