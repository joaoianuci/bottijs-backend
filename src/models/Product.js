const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    imgURL: String,
    name: {
        type: String,
        required: true,
    },
    description: String,
    qntdStock: {
        type: Number,
        select: false
    },
    price: {
        type:Number,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Product', ProductSchema);