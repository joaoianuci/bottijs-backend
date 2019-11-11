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
    async index(req,res){
        const { type } = req.query;
        if(type === "Any" || type === "All"){
            return res.json(await Product.find());
        }
        if(type === ''){
            return res.json({error: "Not found products for this filter"})
        }
        const products = await Product.find({type: type});
        return res.json(products);
    }
}
