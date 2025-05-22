const userService = require('../services/user.service');


async function getUsers(req,res,next) {
    try {
        let atributes = ['id_user','username','name']

        if (req.body){
            atributes = req.body?.atributes
        }
        const users = await userService.getAllUsers(atributes);
        res.status(200).json({success: true, data: users});
    } catch (error) {
        next (error);
    }
    
}

async function getPaginatedUsers(req,res,next){
    try {
        const { page, pageSize, filterName, filterMail, sortBy, sortDirection } = req.query

        if (isNaN(page) || isNaN(pageSize)){
            throw new Error("Error al proporcionar la pagina o el tamaño de pagina.");
        }

        const users = await userService.getPaginatedUsers(page, pageSize, filterName, filterMail, sortBy, sortDirection)

        res.status(200).json({success: true, data: users})
        
    } catch (error) {
        next(error);
    }

}

async function getUserById(req,res,next) {
    try {
        const user = await userService.getUserById(req.params.id);
        if(!user) return res.status(404).json({success: false, message: 'User not found'});
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

async function getUserByUsername(req,res,next) {
    try {
        const user = await userService.getUserByUsername(req.params.username);
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

async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const userData = req.body;

        const updateUser = await userService.updateUser(id, userData);

        res.status(200).json({success: true, data: updateUser});

    } catch (error) {
        next(error);
    }
}

async function deleteUser(req,res,next) {
    try {
        const user = await userService.deleteUser(req.params.id);
        if(!user) return res.status(404).json({success: false, message: 'User not found'});
        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    getPaginatedUsers,
    updateUser,
    createUser,
    deleteUser
}