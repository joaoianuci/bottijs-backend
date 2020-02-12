const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const ProductSchema = new mongoose.Schema({
    thumbnail: String,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    qntdStock: {
        type: Number,
    },
    price: {
        type:Number,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    weight:{
        type: Number,
        required: true,
    },
    height:{
        type: Number,
        required: true,
    },
    width:{
        type: Number,
        required: true,
    },
    length:{
        type: Number,
        required: true,
    },
    diameter:{
        type: Number,
        required: true,
    },
    qntd:{
        type: Number,
        default: 0,
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