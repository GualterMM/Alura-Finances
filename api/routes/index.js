const express = require("express")
const receitas = require("./receitasRoute")
const despesas = require("./despesasRoute")
const resumo = require("./resumoRoute")

module.exports = app => {
    app.use(
        express.json(),
        receitas,
        despesas,
        resumo
        )
    app.get('/', (req, res) => {
        res.status(200).send("Olá!")
    })
    
}