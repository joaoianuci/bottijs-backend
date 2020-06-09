const pagarme = require('pagarme');
const Checkout = require('../models/Checkout');
const CreditCard = require('../models/CreditCard');
const Transaction = require('../models/Transaction');
const Delivery = require('../models/Delivery');

module.exports = {
  async store(req, res, next) {
    const {
      freight,
      address,
      customer,
      card_hash,
      items,
      installments,
      amount: amountClient,
      card_id,
    } = req.body;
    const { user_id } = req.params;
    try {
      let card;
      if (card_id) {
        card = await CreditCard.findOrFail(card_id);
      }
      const client = await pagarme.client.connect({
        api_key: process.env.PAGARME_API_KEY,
      });
      
      const fee = 1000;
      
      const amount = amountClient * 100 + fee;
      const filteredItems = items.map(item => ({
        id: String(item.id),
        title: item.name,
        unit_price: parseInt(item.price * 100, 10),
        quantity: item.qntd,
        tangible: true,
      }));
      const pagarmeTransaction = await client.transactions.create({
        amount: parseInt(amount, 10),
        ...(card_hash ? { card_hash } : { card_id: card.card_id }),
        customer: {
          name: customer.name,
          email: customer.email,
          country: 'br',
          external_id: '1',
          type: 'individual',
          documents: [
            {
              type: 'cpf',
              number: customer.cpf,
            },
            {
              type: 'rg',
              number: customer.rg,
            },
          ],
          phone_numbers: [customer.phone],
        },
        billing: {
          name: customer.name,
          address: {
            ...address,
            country: 'br',
          },
        },
        shipping: {
          name: customer.name,
          fee,
          delivery_date: '2019-07-21',
          expedited: false,
          address: {
            ...address,
            country: 'br',
          },
        },
        items: filteredItems
      });
      if (!card) {
        const { card } = pagarmeTransaction;
        try {
          await CreditCard.create({
            card_id: card.id,
            number: `${card.first_digits}*********${card.last_digits}`,
            holder_name: card.holder_name,
            brand: card.brand,
            expiration_date: card.expiration_date,
          });
        } catch (error) {
          console.log(error);
        }
      }
      const products = items;
      const checkout = await Checkout.create({
        amount: parseInt(amount),
        fee,
        products,
        user: user_id
      });
      const transaction = await Transaction.create({
        checkout: checkout.id,
        transaction_id: pagarmeTransaction.id,
        status: pagarmeTransaction.status,
        authorization_code: pagarmeTransaction.authorization_code,
        brand: pagarmeTransaction.card.brand,
        authorized_amount: pagarmeTransaction.authorized_amount,
        tid: pagarmeTransaction.tid,
        installments,
      }); 
      return res.json(checkout);
    } catch (err) { 
      return res.status(400).send(err);
    }
  },
  async show(req, res) {
    const { id } = req.params;

    const checkout = await Order.findById(id);
    return res.json(checkout);
  }
}
