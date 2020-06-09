const mongoose = require('mongoose');
const Product = require('./Product');

const CheckoutSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    fee: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    delivery: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery' },
    products: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
CheckoutSchema.post('save', async (checkout) => {
    const { products } = checkout;
    products.map(async (item) => {
        const productData = await Product.findById(item); 
        await Product.findByIdAndUpdate(item, { $inc: { qntdStock: - productData.qntd } });
    });
});
module.exports = mongoose.model('Checkout', CheckoutSchema);