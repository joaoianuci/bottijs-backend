const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
    async store(req, res){
        const { email } = req.body;
        const { password } = req.body;
        const { name } = req.body;

        function generateToken(params = {}){
            return jwt.sign({ params }, authConfig.secret,{
                expiresIn: 86400,
            });
        }
        let user = await User.findOne({email});
        if(!user){
            user = await User.create({email, password, name});
        }else{
            return res.status(400).send({error:"User already exists"});
        }
        user.password = undefined;
        return res.json({
            user,
            token: generateToken({id: user._id})
        });
    },
    async show(req, res){
        const { user_id } = req.params;
        const loggedUser = await User.findById(user_id);
        if(!loggedUser){
            return res.status(400).send({error:"Not found user"});
        }
        return res.json(loggedUser);
    }
};
