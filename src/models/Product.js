const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    thumbnail: String,
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
    },
},{ 
    toJSON:{
        virtuals:true,
    }
});
ProductSchema.virtual('thumbnail_url').get(function(){
    return `${process.env.APP_URL}files/${this.thumbnail}`
});
module.exports = mongoose.model('Product', ProductSchema);