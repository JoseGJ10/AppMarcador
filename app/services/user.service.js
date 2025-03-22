const bcrypt = require('bcrypt');
const { User } = require('../models');

async function getAllUsers() {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error("Error getting users");
    }
}

async function getUserById(id) {
    try {
        const userById = await User.findByPK(id);
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


async function deleteUser(id) {
    try {
        await User.destroy({ where: { id } });
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error("Error deleting user by id: " + id);
    }
}
module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    deleteUser
}