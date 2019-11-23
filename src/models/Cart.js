const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    qntd: {
        type: Number,
        required: true,
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Cart', CartSchema);
