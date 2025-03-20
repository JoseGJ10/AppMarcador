const { User } = require('../models/user');

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
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw new Error("Error creating user: " + error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
}