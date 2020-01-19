const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
module.exports = {
    async store(req, res) {
        const { qntd } = req.body;
        const { date } = req.body;
        const { user_id } = req.params;
        const { product_id } = req.headers;
        
        const user = await User.findById(user_id);
        if(!user)
        return res.status(400).send({error:"User invalid"});
        const purchase = await Purchase.create({
            user: user_id,
            product: product_id,
            qntd,
            date,
        });
        const productUpdate = await Product.findById(product_id);
        productUpdate.qntdStock = productUpdate.qntdStock - qntd;
        await Product.findByIdAndUpdate(product_id, {$set: {qntdStock: productUpdate.qntdStock}});
        await purchase.populate('product').populate('user').execPopulate();
        return res.json(purchase);
    },
}  