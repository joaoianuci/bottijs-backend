const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    qntd: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    freght: {
        type: Number,
        required: true,
    },
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