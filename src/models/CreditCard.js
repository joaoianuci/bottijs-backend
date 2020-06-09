const { Schema, model } = require('mongoose');
const CreditCardSchema = new Schema({
    card_id: { type: String, required: true, unique: false},
    number: { type: String, required: true, unique: false},
    holder_name: { type: String, required: true},
    expiration_date: { type: String, required: true},
    brand: { type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = model('CreditCard', CreditCardSchema);