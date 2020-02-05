const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
    async store(req, res){
        const { secret } = authConfig.auth;
        const { email } = req.body;
        const { password } = req.body;
        const { name } = req.body;

        function generateToken(params = {}){
            return jwt.sign({ params }, secret,{
                expiresIn: 86400,
            });
        }
        let user = await User.findOne({email});
        if(!user){
            try{
                user = await User.create({email, password, name});
            }catch{
                return res.status(400).send({erro:"Error in create account"})
            }
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
    },
    async update(req, res){
        const { user_id } = req.params;
        const { name } = req.body;
        const loggedUser = await User.findByIdAndUpdate(user_id,
            {
                $set: { name }
            },{useFindAndModify: false}
            );
        if(!loggedUser)
            return res.status(404).send("User not was found");
        
        loggedUser.name = name;
        
        return res.json(loggedUser);
        
    },
    async destroy(req,res){
        const { user_id } = req.params;
        try{
            await User.findByIdAndDelete(user_id);
        }catch{
            return res.status(404).send("User not was found");
        }
        
        return res.json();
    }
};
