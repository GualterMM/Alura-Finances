const { Router } = require("express")
const ResumoController = require("../controllers/ResumoController")
const router = Router()

router
  .get('/resumo/:ano/:mes', ResumoController.pegarResumoMes)

module.exports = router