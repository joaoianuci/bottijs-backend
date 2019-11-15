const dotenv= require('dotenv');
dotenv.config();
module.exports={
    auth:{
        "secret": process.env.CRYPT_SECRET
    }
}