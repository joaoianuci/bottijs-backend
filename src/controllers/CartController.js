const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');
const returnCartsAsProducts = require('../utils/returnCartsAsProducts');

module.exports = {
    async store(req, res) {
        const { qntd } = req.body;
        const { user_id } = req.params;
        const { product_id } = req.headers;
        
        const productCart = await Product.findById(product_id);
        if(!productCart){
            return res.status(404).send({error:"Product not found"});
        }

        const user = await User.findById(user_id);

        if(!user){
            return res.status(404).send({error:"Not found user"});
        }
        
        const carts = await Cart.find({ user: user_id});

        const conflictCart = carts.filter(cart => cart.product === productCart._id);
                
        if(conflictCart === undefined){
            return res.status(409).send({error:"That product already in user cart"});
        }

        const cart = await Cart.create({
            user: user_id,
            product: product_id,
            qntd,
        });
   
        await cart.populate('product').populate('user').execPopulate();

        return res.json(cart);
    },
    async index(req,res){
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        if(!user){
            return res.status(404).send({error:"Not found user"});
        }
        const carts = await Cart.find({ user: user_id});
        if(carts.length === 0){
            return res.status(404).send({message:"Cart empty"});
        }

        const cartProducts = await returnCartsAsProducts(carts);
        
        return res.json(cartProducts);
    }
}
