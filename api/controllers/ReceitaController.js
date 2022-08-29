const { ReceitasServices } = require('../services')
const receitasServices = new ReceitasServices()

class ReceitaController {
    // TODO: Testar os métodos

    static async criarReceita(req, res){
        let response
        const novaReceita = {
            ...req.body,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        try{
            const novaReceitaCriada = await receitasServices.criarRegistro(novaReceita)
            response = res.status(200).json(novaReceitaCriada)
        } catch(err){
            if(err.message == "Validation error"){
                response = res.status(500).json({"message": "Erro de validação: campo de descrição em uso."})
            }
            response = res.status(500).json(err.message)
        } finally{
            return response
        }

    }

    static async pegarReceitas(req, res){
        let response

        try{
            const receitas = await receitasServices.pegarTodosOsRegistros()
            response = res.status(200).json(receitas)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }

    }

    static async pegarReceitaPorId(req, res){
        let response
        const {id} = req.params

        try{
            const receita = await receitasServices.pegarRegistroPorId(id)
            response = res.status(200).json(receita)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }

    static async pegarReceitasPorDescricao(req, res){
        let response
        // FIXME: Fazer validação da query.
        const descricao  = req.query.descricao || null
        const where = { "descricao" : descricao }

        try{
            const receita = await receitasServices.pegarTodosOsRegistrosOnde(where)
            response = res.status(200).json(receita)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }

    static async pegarReceitasPorMes(req, res){
        let response
        // FIXME: Fazer validação dos params.
        let { ano, mes } = req.params
        ano = Number(ano)
        mes = Number(mes)

        const dataInicio = `${ano}-${mes}-01`
        const dataFim = mes % 12 == 0 ? `${ano + 1}-01-01` : `${ano}-${mes + 1}-01`

        try{
            const receita = await receitasServices.pegarRegistrosPorMes(dataInicio, dataFim)
            response = res.status(200).json(receita)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }

    static async atualizarReceitaPorId(req, res){
        let response
        const {id} = req.params
        const atualizacao = { ...req.body, updatedAt: Date.now() }

        try{
            const statusAtualizacao = await receitasServices.atualizarRegistro(atualizacao, id)

            if (statusAtualizacao == 1) {
                response = res.status(200).json({ "message": "Cadastro atualizado com sucesso." })
            } else {
                response = res.status(400).json({ "message": "Falha ao atualizar cadastro." })
            }
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }

    static async removerReceitaPorId(req, res){
        let response
        const {id} = req.params

        try{
            await receitasServices.removerRegistro(id)
            response = res.status(500).json({"message" : `Cadastro com id ${id} removido com sucesso.`})
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }
}

module.exports = ReceitaController

