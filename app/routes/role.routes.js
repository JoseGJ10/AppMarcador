const express = require('express');
const RoleController = require('../controllers/role.controller'); 
const router = express.Router();

router.post('/newRole', RoleController.createRole);

router.get('/roles', RoleController.getAll);

router.get('/roles/:id', RoleController.getById);

router.put('/roles/:id',RoleController.update);

router.delete('/roles/:id', RoleController.deleteRol);

module.exports = router;
