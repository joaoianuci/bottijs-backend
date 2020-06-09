const CreditCard = require('../models/CreditCard');
module.exports = {
    async index(req, res) {
        const cards = await CreditCard.find();
        return res.json({cards});
    }
}