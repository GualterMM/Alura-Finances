const { sequelize } = require('../models')
const { Op } = require('sequelize')
const database = require('../models')
const Services = require('./Services')

class DespesasServices extends Services {
    constructor(){
        super('Despesas')
    }

    async pegarValorDespesasMes(dataInicio, dataFim){
        return database[this.nomeDoModelo].findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('valor')), 'total_despesas']
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

    async pegarValorPorCategoria(dataInicio, dataFim){
        return database[this.nomeDoModelo].findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('valor')), 'total_despesas'],
                'categoria'
            ],
            where: {
                data: {
                    [Op.and]: {
                        [Op.gte]: dataInicio,
                        [Op.lt]: dataFim
                    }
                }
            },
            group: 'categoria',
            raw: true
        })
    }
}

module.exports = DespesasServices