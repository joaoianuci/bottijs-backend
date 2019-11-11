const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
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

module.exports = mongoose.model('Purchase', PurchaseSchema);