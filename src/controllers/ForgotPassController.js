const User = require('../models/User');
const mailer = require('../modules/mailer');
const crypto = require('crypto');

module.exports = {
    async store(req, res){
        const { email } = req.body;

        try{
            const user = await User.findOne({ email });

            if(!user)
                return res.status(400).send({error: 'User not found'});
            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set':{
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });
            mailer.sendMail({
                to: email,
                from: 'joaoianuci@gmail.com',
                template:'auth/forgot_password',
                context: { token },
            }, (err) =>{
                if(err){
                    console.log(err)
                    return res.status(400).send({error: 'Cannot send forgot password email'});
                }
            });
            res.status(200).send({message:'E-mail successfully sent'})
        }catch(err){
            console.log(err);
            res.status(400).send({error:'Error on forgot password, try again'});
        }
    }
};