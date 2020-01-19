const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');
module.exports = {
    async store(req, res) {
        const { qntd } = req.body;
        const { user_id } = req.params;
        const { product_id } = req.body.headers;
        
        const productCart = await Product.findById(product_id);
        if(!productCart){
            return res.status(400).send({error:"Product not found"});
        }
        const cart = await Cart.create({
            user: user_id,
            product: product_id,
            qntd,
        });
   
        await cart.populate('product').populate('user').execPopulate();
        return res.json(cart);
    },
    async show(req,res){
        const { user_id } = req.headers;
        let user = await User.findById(user_id);
        if(!user){
            return res.status(400).send({error:"Not found user"});
        }
        const cartProducts = await Cart.find({ user: user_id});
        if(cartProducts.lenght === undefined){
            return res.status(400).send({message:"Cart empty"});
        }
        return res.json(cartProducts);
    }
}