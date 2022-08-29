const { ResumoServices } = require('../services')
const resumoServices = new ResumoServices()

class ResumoController {

    static async pegarResumoMes(req, res){
        let response
        // FIXME: Fazer validação dos params.
        let { ano, mes } = req.params
        ano = Number(ano)
        mes = Number(mes)

        const dataInicio = `${ano}-${mes}-01`
        const dataFim = mes % 12 == 0 ? `${ano + 1}-01-01` : `${ano}-${mes + 1}-01`

        try{
            const resumo = await resumoServices.pegarResumo(dataInicio, dataFim)
            response = res.status(200).json(resumo)
        } catch(err){
            response = res.status(500).json(err.message)
        } finally{
            return response
        }
    }

}

module.exports = ResumoController