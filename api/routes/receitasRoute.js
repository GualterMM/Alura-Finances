const { Router } = require("express")
const ReceitaController = require("../controllers/ReceitaController")
const router = Router()

router
  .post('/receitas', ReceitaController.criarReceita)
  .get('/receitas', ReceitaController.pegarReceitas)
  .get('/receitas/:id', ReceitaController.pegarReceitaPorId)
  .put('/receitas/:id', ReceitaController.atualizarReceitaPorId)
  .delete('/receitas/:id', ReceitaController.removerReceitaPorId)

module.exports = router