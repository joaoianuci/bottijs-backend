const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    status: { type: String, required: true, default: 'done' },
    name: { type: String, required: true},
    trackingCode: { type: String },
    total: { type: Number, required: true },
    term: { type: Number, required: true },
    address: {
        type: {
            neighborhood: { type: String, required: true },
            complement: { type: String },
            street_number: { type: String, required: true },
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipcode: { type: String, required: true }
        },
        required: true
    },
    checkout: { type: mongoose.Schema.Types.ObjectId, ref: "Checkout", required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Delivery', DeliverySchema);