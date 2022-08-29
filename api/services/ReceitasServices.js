const { sequelize } = require('../models')
const { Op } = require('sequelize')
const database = require('../models')
const Services = require('./Services')

class ReceitasServices extends Services {
    constructor(){
        super('Receitas')
    }

    async pegarValorReceitasMes(dataInicio, dataFim){
        return database[this.nomeDoModelo].findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('valor')), 'total_receitas']
            ],
            where: {
                data: {
                    [Op.and]: {
                        [Op.gte]: dataInicio,
                        [Op.lt]: dataFim
                    }
                }
            },
            raw: true
        })
    } 
}

module.exports = ReceitasServices