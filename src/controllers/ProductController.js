const Product = require ('../models/Product');
module.exports = {
    async store(req,res){
        const { imgURL } = req.body;
        const { name } = req.body;
        const { type } = req.body;
        const { qntdStock } = req.body;
        const { price } = req.body;
        const { date } = req.body;

        let product = await Product.findOne({ name });
        if(!product){
            product = await Product.create({imgURL, name, type,qntdStock, price, date});
        }

       return res.json(product);
    },
    async show(req,res){
        const { product_id } = req.params;
        const product = await Product.findById(product_id);
        if(!product){
            return res.status(400).send({error:"Not found product"});
        }
        return res.json(product);
        
    }
};