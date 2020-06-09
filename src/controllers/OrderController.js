const User = require('../models/User');
const Checkout = require('../models/Checkout');

module.exports = {
    async store(req, res) {
        const { products } = req.body;         
        const { total } = req.body;
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        if(!user)
            return res.status(400).send({error:"User invalid"});
        const checkout = await Checkout.create({
            user: user_id,
            products,
            total,
        });
        await checkout.populate('products').populate('user').execPopulate();
        return res.json(checkout);
    },
}  