const Product = require('../models/Product');
const { calcFreight } = require('./integrations/correios');

module.exports = {
    async calcFreight(req, res){
        const { cep } = req.body;
        let { products } = req.body;
        products = JSON.stringify(products);
        const _products = JSON.parse(products);
        try {
            const cart = await Promise.all(_products.map(async(item) =>{
                item.product = await Product.findById(item._id);
                return item;
            }));
            const results = await calcFreight({cep, products: cart});
            return res.json(results);
        } catch (error) {
            console.log(error);
        }
    }
}
