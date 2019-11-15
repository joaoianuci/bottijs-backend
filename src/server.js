const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(process.env.PORT);