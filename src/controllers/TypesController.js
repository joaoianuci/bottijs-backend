const Product = require('../models/Product');
module.exports = {
    async index(req,res){
        const products = await Product.find();
        const types = products.map((product) => product.type).filter((type) => {
            if(type !== null){
                return type;
            }
        }).reduce((unique, item ) => unique.includes(item) ? unique : [...unique, item], []);
        types.push('Any');
        return res.json(types);
    }
}