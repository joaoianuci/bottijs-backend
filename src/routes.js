const express = require('express');
const multer = require('multer');
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const TypesController = require('./controllers/TypesController');
const OfferController = require('./controllers/OfferController');
const CartController = require('./controllers/CartController');
const PurchaseController = require('./controllers/PurchaseController');
const AuthenticateController = require('./controllers/AuthenticateController');
const ForgotPassController = require('./controllers/ForgotPassController');
const ResetPassController = require('./controllers/ResetPassController');
const uploadConfig = require('./config/upload');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/users', UserController.store);
routes.get('/users/:user_id', UserController.show);
routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.destroy);

routes.post('/products', upload.single('thumbnail'), ProductController.store);
routes.get('/products/:product_id', ProductController.show);
routes.put('/products/:product_id', upload.single('thumbnail'), ProductController.update);

routes.get('/types', TypesController.index);

routes.get('/products', OfferController.index);

routes.post('/users/:user_id/cart', CartController.store);
routes.get('/users/:user_id/cart', CartController.index);
routes.delete('/users/:user_id/cart', CartController.destroy);

routes.post('/users/:user_id/purchase', authMiddleware,PurchaseController.store);

routes.post('/users/authenticate', AuthenticateController.store);

routes.post('/forgot_password', ForgotPassController.store)
routes.post('/forgot_password/reset_password', ResetPassController.store)
module.exports = routes;    
