const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { email } = req.body;
        const { token } = req.query;
        const { password } = req.body;
        try{
            const user = await User.findOne({email})
                .select('+passwordResetToken passwordResetExpires');
            if(!user)
                return res.status(400).send({error: 'User not found'});
            if(token !== user.passwordResetToken)
                return res.tatus(402).send({error: 'Token invalid'})
            const now = new Date();

            if(now > user.passwordResetExpires)
                return res.status(402).send({error:'Token expired, generate a new one'});

            user.password = password;
            await user.save();
        }catch(err){
            res.status(400).send({error:'Cannot reset password, try again'})
            
        }
        res.send({message:"ok"});
    }
};