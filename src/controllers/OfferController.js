const Product = require('../models/Product');
module.exports = {
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