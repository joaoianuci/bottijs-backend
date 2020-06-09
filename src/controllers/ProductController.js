const Product = require ('../models/Product');
module.exports = {
    async store(req,res){
        const { filename } = req.file;
        const { name } = req.body;
        const { type } = req.body;
        const { qntdStock } = req.body;
        const { price } = req.body;
        const { width, height, length, diameter, weight } = req.body;
        let product = await Product.findOne({ name });
        if(!product){
            try {
                product = await Product.create({
                    thumbnail: filename,
                    name,
                    type,
                    qntdStock,
                    price,
                    width,
                    height,
                    length,
                    diameter,
                    weight
                });
            } catch(e) {
                return res.status(400).send({error: "Fail in insert a new product"});
            }
        }

       return res.json(product);
    },
    async show(req,res){
        const { product_id } = req.params;
        const product = await Product.findById(product_id);
        if(!product){
            return res.status(404).send({error:"Not found product"});
        }
        return res.json(product);
        
    },
    async update(req,res){
        const { product_id } = req.params;
        const { filename } = req.file;
        const { name } = req.body;
        const { type } = req.body;
        const { qntdStock } = req.body;
        const { price } = req.body;
        const { width, height, length, diameter, weight } = req.body;
        const product = await Product.findByIdAndUpdate(product_id,
            {
                $set: { thumbnail: filename, name, price: Number(price), type, qntdStock, width, height, length, diameter, weight }
            },
            { useFindAndModify: false }
        );
        if(!product){
            return res.status(404).send("Product not was found");
        }
        return res.json(product);
    },
    async destroy(req, res){
        const { product_id } = req.params;
        try{
            await Product.findByIdAndDelete(product_id);
        }catch{
            return res.status(404).send("Product not was found");
        }
        
        return res.json();
    }
};