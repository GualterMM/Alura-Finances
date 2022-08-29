const { DespesasServices } = require('../services')
const despesasServices = new DespesasServices()

class DespesaController {
    // TODO: Testar os métodos

    static async criarDespesa(req, res){
        let response
        const novaDespesa = {
            ...req.body,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }

        try{
            const novaDespesaCriada = await despesasServices.criarRegistro(novaDespesa)
            response = res.status(200).json(novaDespesaCriada)
        } catch(err){
            if(err.message == "Validation error"){
                response = res.status(500).json({"message": "Erro de validação: campo de descrição em uso."})
            }
            response = res.status(500).json(err.message)
        } finally{
            return response
        }

    }

    static async pegarDespesas(req, res){
        let response

        try{
            const despesas = await despesasServices.pegarTodosOsRegistros()
            response = res.status(200).json(despesas)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }

    }

    static async pegarDespesaPorId(req, res){
        let response
        const {id} = req.params

        try{
            const despesa = await despesasServices.pegarRegistroPorId(id)
            response = res.status(200).json(despesa)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }
    
    static async pegarDespesasPorDescricao(req, res){
        let response
        const descricao = req.query.descricao || null
        const where = { "descricao" : descricao }

        try{
            const despesa = await despesasServices.pegarTodosOsRegistrosOnde(where)
            response = res.status(200).json(despesa)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }

    static async pegarDespesasPorMes(req, res){
        let response
        // FIXME: Fazer validação dos params.
        let { ano, mes } = req.params
        ano = Number(ano)
        mes = Number(mes)

        const dataInicio = `${ano}-${mes}-01`
        const dataFim = mes % 12 == 0 ? `${ano + 1}-01-01` : `${ano}-${mes + 1}-01`

        try{
            const despesa = await despesasServices.pegarRegistrosPorMes(dataInicio, dataFim)
            response = res.status(200).json(despesa)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }

    static async atualizarDespesaPorId(req, res){
        let response
        const {id} = req.params
        const atualizacao = { ...req.body, updatedAt: Date.now() }

        try{
            const statusAtualizacao = await despesasServices.atualizarRegistro(atualizacao, id)

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

    static async removerDespesaPorId(req, res){
        let response
        const {id} = req.params

        try{
            await despesasServices.removerRegistro(id)
            response = res.status(500).json({"message" : `Cadastro com id ${id} removido com sucesso.`})
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }
}

module.exports = DespesaController

