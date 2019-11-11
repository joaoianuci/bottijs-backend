const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    qntd: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = mongoose.model('Cart', CartSchema);
