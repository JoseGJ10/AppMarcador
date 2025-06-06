const bcrypt = require('bcrypt');
const { User } = require('../models');
    const { Op } = require('sequelize');

async function getAllUsers(attributes) {
    try {

        const users = await User.findAll({attributes});
        return users;

    } catch (error) {

        throw new Error("Error getting users");
        
    }
}

async function getPaginatedUsers(page, pageSize, username, mail, sortBy, sortDirection) {
    try {
        const limit = parseInt(pageSize,10);
        const offset = 0 + (parseInt(page,10) -1 ) * limit
        const where = {};
        const order = [];

        if (username) {
            where.username = {
                [Op.like]: `%${username}%`, // Op.iLike para búsqueda insensible a mayúsculas
            };
        }

        if (mail) {
            where.mail = {
                [Op.like]: `%${mail}%`, // Op.iLike para búsqueda insensible a mayúsculas
            };
        }

        // Ordenamiento (si se proporciona)
        if (sortBy && ['username', 'email', 'id_user','RoleIdRole'].includes(sortBy)) {
            order.push([sortBy, sortDirection === 'desc' ? 'DESC' : 'ASC']);
        } else {
            order.push(['username', 'ASC']); // Ordenamiento por defecto
        }

        const users = await User.findAndCountAll({
            where,
            offset,
            limit,
            order,
          });

        return users;

    } catch (error) {
        throw new Error('Error fetching Users ' + error)
    }
}

async function getUserById(id) {
    try {

        const userById = await User.findByPk(id);
        return userById;

    } catch (error) {

        throw new Error("Error getting user by id: " + id);
    }
};

async function getUserByUsername(username) {
    try {

        const userById = await User.findOne({where: {username: username}});
        return userById;

    } catch (error) {
        throw new Error("Error getting user by username: " + username);
    }
};

async function createUser(userData) {
    try {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);


        const newUser = await User.create({...userData, password : hashedPassword });
        
        return newUser;

    } catch (error) {

        throw new Error("Error creating user: " + error);

    }
};

async function updateUser(id, userData) {
    try {
        
        const user = await user.findByPk(id);
    
        if(! user){
            throw new Error(`User with ID ${id} not found.`)
        }
    
        const updateUser = await user.update(userData);
    
        return updateUser

    } catch (error) {
        throw new Error('Error updating user.')
    }
}

async function deleteUser(id) {
    try {
        await User.destroy({ where: { id } });
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error("Error deleting user by id: " + id);
    }
}

async function countUsers() {
    try {
        
        const users = await User.count();

        return users;

    } catch (error) {

        throw new Error("Error count users.");
        
    }
    
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getPaginatedUsers,
    updateUser,
    createUser,
    deleteUser,
    countUsers
}