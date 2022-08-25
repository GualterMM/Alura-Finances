const express = require("express")
const receitas = require("./receitasRoute")
const despesas = require("./despesasRoute")

module.exports = app => {
    app.use(
        express.json(),
        receitas,
        despesas
        )
    app.get('/', (req, res) => {
        res.status(200).send("Olá!")
    })
    
}