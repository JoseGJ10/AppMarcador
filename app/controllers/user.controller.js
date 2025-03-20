const userService = require('../services/user.service');


async function getUsers(req,res,next) {
    try {
        const users = await userService.getUsers();
        res.status(200).json({success: true, data: users});
    } catch (error) {
        next (error);
    }
    
}

async function getUserById(req,res,next) {
    try {
        const user = await userService.getUserById(req.body.id);
        if(!user) return res.status(404).json({success: false, message: 'User not found'});
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

async function getUserByUsername(username) {
    try {
        const user = await userService.getUserByUsername(username);
        if(!user) return res.status(404).json({success: false, message: 'User not found'});
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

async function createUser(req,res,next) {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    createUser,
}