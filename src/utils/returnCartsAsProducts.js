const Product = require('../models/Product');

module.exports = async function returnCartsAsProducts(carts){
    const cartProducts = [];

    for (let i = 0; i < carts.length; i++) {
        const response = await Product.findById(carts[i].product);
        cartProducts.push(response)
    }
    
    return cartProducts;
}