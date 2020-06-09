const express = require('express');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const TypesController = require('./controllers/TypesController');
const OfferController = require('./controllers/OfferController');
const CartController = require('./controllers/CartController');
const CardController = require('./controllers/CardController');
const AuthenticateController = require('./controllers/AuthenticateController');
const ForgotPassController = require('./controllers/ForgotPassController');
const DeliveryController = require('./controllers/DeliveryController')
const ResetPassController = require('./controllers/ResetPassController');
const CheckoutController = require('./controllers/CheckoutController');
const authMiddleware = require('./middlewares/auth');
const uploadConfig = require('./config/upload');
const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.store);
routes.get('/users/:user_id', UserController.show);
routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.destroy);

routes.post('/products', upload.single('thumbnail'), ProductController.store);
routes.get('/products/:product_id', ProductController.show);
routes.put('/products/:product_id', upload.single('thumbnail'), ProductController.update);
routes.delete('/products/:product_id', ProductController.destroy);

routes.get('/types', TypesController.index);

routes.get('/products', OfferController.index);

routes.post('/users/:user_id/cart', CartController.store);
routes.get('/users/:user_id/cart', CartController.index);
routes.delete('/users/:user_id/cart', CartController.destroy);

routes.get('/cards', CardController.index);

routes.post('/users/:user_id/checkout', CheckoutController.store);

routes.post('/users/authenticate', AuthenticateController.store);

routes.post('/forgot_password', ForgotPassController.store)
routes.post('/forgot_password/reset_password', ResetPassController.store)

routes.post('/deliveries/calc', DeliveryController.calcFreight);

module.exports = routes;    
