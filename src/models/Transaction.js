const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = Schema({
    authorization_code: {type: String, required: false},
    authorization_amount: {type: String, required: false},
    transaction_id: {type: String, required: false},
    tid: {type: String, required: false},
    brand: {type: String, required: false},
    installments: { type: Number, default: 1 },
    status: { type: String, required: true },
    checkout: { type: Schema.Types.ObjectId, ref: "Checkout", required: true },
}, { timestamps: true })

module.exports = mongoose.model("Transaction", Transaction);