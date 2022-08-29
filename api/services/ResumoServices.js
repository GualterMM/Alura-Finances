const ReceitasServices = require("./ReceitasServices");
const DespesasServices = require("./DespesasServices");
const { QueryTypes } = require('sequelize');
const database = require('../models')

class ResumoServices {
    constructor(){
        this.receitasService = new ReceitasServices('Receitas')
        this.despesasService = new DespesasServices('Despesas')
    }

    async pegarSaldoTotalMes(dataInicio, dataFim){
        return await database.sequelize.query(`SELECT ((SELECT SUM(r.valor) FROM \`Receitas\` AS r 
        WHERE r.data >= "${dataInicio}" AND r.data < "${dataFim}") - SUM(d.valor)) AS saldo FROM \`Despesas\` AS d 
        WHERE d.data >= "${dataInicio}" AND d.data < "${dataFim}"`, 
        { type: QueryTypes.SELECT });
    }

    async pegarResumo(dataInicio, dataFim){
        
        const resumo = await Promise.all([
            this.receitasService.pegarValorReceitasMes(dataInicio, dataFim),
            this.despesasService.pegarValorDespesasMes(dataInicio, dataFim),
            this.pegarSaldoTotalMes(dataInicio, dataFim),
            this.despesasService.pegarValorPorCategoria(dataInicio, dataFim)
        ])
        // TODO: Tirar os objetos de dentro do array
        const merged = resumo.flat(1)

        return merged
    }
}

module.exports = ResumoServices