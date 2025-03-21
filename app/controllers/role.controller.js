const express = require('express');
const RoleService = require('../services/role.service'); // Asegúrate de usar la ruta correcta al servicio RoleService
const router = express.Router();

async function createRole(req, res, next){

    try {

        const newRole = await RoleService.createRole(req.body.name);
        
        res.status(201).json({success: true, data: newRole });

    } catch (error) {

        next(error)   

    }

};

async function getAll(req,res,next){
    try {
        
        const roles = await RoleService.findAllRoles();
    
        res.status(200).json({success: true, data: roles });

    } catch (error) {

        next (error)
        
    }
};

async function getById(req,res,next){
    try {
        const role = await RoleService.findRoleById(req.params.id);
        if (!role) {
            res.status(404).json({success: false, message: 'Rol not found'})
        } else {
            res.status(200).json({success: true, data: role });
        }
    } catch (error) {
        next (error)
    }
};

 async function update(req,res,next){
    try {
        const role = await RoleService.updateRole(req.params.id, req.body);
        
        if (!role) { 
            res.status(404).json({ success: false, message: 'Rol not found'});
        } else {
            res.status(200).json({success: true, data: role });
        }


    } catch (error) {
        next (error)
    }

};

async function deleteRol(req, res, next){
    try {
        const deletedRole = await RoleService.deleteRole(req.params.id);

        if (!deletedRole) { 
            res.status(404).json({ success: false, message: 'Rol not found'});
        } else {
            res.status(200).json({success: true, data: deletedRole });
        }
    } catch (error) {
        next (error)
    }
}


module.exports = {
    createRole,
    getAll,
    getById,
    update,
    deleteRol

};
