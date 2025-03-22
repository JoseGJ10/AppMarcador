const express = require('express');
const RoleController = require('../controllers/role.controller'); 
const { authenticate, authorization } = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/', [authenticate, authorization('admin')],  RoleController.createRole);

router.get('/', [authenticate, authorization('admin')], RoleController.getAll);

router.get('/:id', [authenticate, authorization('admin')],  RoleController.getById);

router.put('/:id', [authenticate, authorization('admin')],  RoleController.update);

router.delete('/:id', [authenticate, authorization('admin')],  RoleController.deleteRol);

module.exports = router;
