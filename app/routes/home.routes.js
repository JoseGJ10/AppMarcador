const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller')

module.exports = router

router.get('/', function(req, res) {
    res.send("Servidor Node Funcionando")
});

router.get('/dashboard-stars', homeController.getDashBoardStats);

router.get('/audit/images', homeController.auditImages);

router.get('/audit/uploadSize', homeController.usedUploadFolder);