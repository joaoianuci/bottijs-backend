const Correios = require('node-correios');
correios = new Correios();
const config = require('../../config/correios');
const { calcBox } = require("../../utils/calcBox");

module.exports = {
    async calcFreight({cep, products}){
        const _products = products.map(item => ({
            weight: item.weight,
            diameter: item.diameter,
            height: item.height,
            width: item.width,
            qntd: item.qntd,
            price: item.price
        }));

        const box = calcBox(_products);
        const totalWeight = _products.reduce((all, item) => all + (item.weight * item.qntd), 0);
        const finalValue = _products.reduce((all, item) => all + (item.price * item.qntd), 0);

        try {
            const results = await Promise.all(
                config.nCdServico.split(', ').map(async(servico) =>{
                    const result = await correios.calcPrecoPrazo({
                        nCdServico: servico,
                        sCepOrigem: config.sCepOrigem.replace(/-/g, ""),
                        sCepDestino: cep,
                        nVlPeso: totalWeight,
                        nCdFormato: 1,
                        nVlComprimento: box.lenght,
                        nVlAltura: box.height,
                        nVlLargura: box.width,
                        nVlDiamentro: 0,
                        nVlValorDeclarado: finalValue < 19.5 ? 19.5 : finalValue
                    });
                    result[0].nServico = result[0].Codigo === 40010 ? "Sedex" : "PAC";
                    return {...result[0]};
                })
            );
            return results;
        } catch (error) {
            return error;
        }
    }
}