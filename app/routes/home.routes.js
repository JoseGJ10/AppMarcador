const express = require('express');
const router = express.Router();

module.exports = router

router.get('/', function(req, res) {
    res.send("Servidor Node Funcionando")
});