const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
module.exports = {
    async store(req, res){
        const { email } = req.body;
        const { password } = req.body;

        function generateToken(params = {}){
            return jwt.sign({ params }, authConfig.secret,{
                expiresIn: 86400,
            });
        }

        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).send({error: 'User not found'});
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'Invalid password'})
        }
        user.password = undefined;

        return res.json({
            user,
            token: generateToken({id: user._id}) 
        });
    }
};