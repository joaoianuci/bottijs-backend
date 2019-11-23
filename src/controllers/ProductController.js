const Product = require ('../models/Product');
module.exports = {
    async store(req,res){
        const { filename } = req.file;
        const { name } = req.body;
        const { type } = req.body;
        const { qntdStock } = req.body;
        const { price } = req.body;
        const { date } = req.body;

        let product = await Product.findOne({ name });
        if(!product){
            try {
                product = await Product.create({
                    thumbnail: filename,
                    name,
                    type,
                    qntdStock,
                    price,
                    date
                });
            } catch {
                return res.status(400).send({error: "Fail in insert a new product"});
            }
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