const { Router } = require("express")
const DespesaController = require("../controllers/DespesaController")
const router = Router()

router
  .post('/despesas', DespesaController.criarDespesa)
  .get('/despesas', DespesaController.pegarDespesas)
  .get('/despesas/:id', DespesaController.pegarDespesaPorId)
  .put('/despesas/:id', DespesaController.atualizarDespesaPorId)
  .delete('/despesas/:id', DespesaController.removerDespesaPorId)

module.exports = router