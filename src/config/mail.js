const dotenv= require('dotenv');
dotenv.config();
module.exports ={
    mail:{
        "host": process.env.MAIL_HOST,
        "port": process.env.MAIL_PORT,
        "user": process.env.MAIL_USER,
        "pass": process.env.MAIL_PASS
    }
}

