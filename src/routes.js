const express = require('express');
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const OfferController = require('./controllers/OfferController');
const CartController = require('./controllers/CartController');
const PurchaseController = require('./controllers/PurchaseController');
const AuthenticateController = require('./controllers/AuthenticateController');
const ForgotPassController = require('./controllers/ForgotPassController');
const ResetPassController = require('./controllers/ResetPassController');

const authMiddleware = require('./middlewares/auth');
const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users/:user_id', UserController.show);
routes.post('/products', ProductController.store);
routes.get('/products/:product_id', ProductController.show);
routes.get('/products', OfferController.index);
routes.post('/products/:product_id/carts', CartController.store);
routes.get('/carts/:user_id', CartController.show);
routes.post('/products/:product_id/purchases', authMiddleware,PurchaseController.store);
routes.post('/authenticate', AuthenticateController.store);
routes.post('/forgot_password', ForgotPassController.store)
routes.post('/forgot_password/reset_password', ResetPassController.store)
module.exports = routes;    
