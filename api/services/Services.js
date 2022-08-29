const database = require('../models')
const { Op } = require('sequelize')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegarTodosOsRegistros(){
        return database[this.nomeDoModelo].findAll()
    }

    async pegarTodosOsRegistrosOnde(condicoes){
        return database[this.nomeDoModelo].findAll({where: {...condicoes}})
    }

    async pegarRegistroPorId(id){
        return database[this.nomeDoModelo].findOne({ where: { id: Number(id) } })
    }

    async pegarRegistrosPorMes(dataInicio, dataFim){
        return database[this.nomeDoModelo].findAll({
            where: {
                data: {
                    [Op.and]: {
                        [Op.gte]: dataInicio,
                        [Op.lt]: dataFim
                    }
                }
            }
        })
    }

    async criarRegistro(dados){
        return database[this.nomeDoModelo].create(dados)
    }
    
    async atualizarRegistro(dadosAtualizados, id, transacao = {}){
        return database[this.nomeDoModelo]
        .update(dadosAtualizados, {
            where: { id: Number(id) },
            transacao
        })
    }

    async atualizarRegistrosOnde(dadosAtualizados, where, transacao = {}){
        return database[this.nomeDoModelo]
        .update(dadosAtualizados, {
            where: { ...where },
            transacao
        })
    }

    async removerRegistro(id){
        return database[this.nomeDoModelo].destroy({ where: { id: Number(id) } })
    }

    async removerRegistrosOnde(where){
        return database[this.nomeDoModelo].destroy({ where: { ...where } })
    }
}

module.exports = Services