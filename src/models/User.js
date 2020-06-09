const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken:{
        type: String,
        select: false,
    },
    passwordResetExpires:{
        type: Date,
        select: false,
    },
    name: {
        type: String,
        require: true,
    },
    address:{
        type: {
            number: { type: Number, required: true },
            complement: { type: String },
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            cep: { type: String, required: true }
        },
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});
module.exports = model('User', UserSchema);