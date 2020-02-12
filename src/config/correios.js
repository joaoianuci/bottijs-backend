const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    nCdServico: process.env.CORREIOS_SERVICO,
    sCepOrigem: process.env.CORREIOS_CEP
};