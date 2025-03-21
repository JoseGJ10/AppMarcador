const { Role } = require('../models'); // Asegúrate de usar la ruta correcta al modelo Role

    // Método para crear un nuevo rol
    async function createRole(name) {
        try {
            const newRole = await Role.create({ name });
            return newRole;            
        } catch (error) {
            throw new Error("Error creating rol: " + error);

        }

        }

        // Método para buscar un rol por ID
    async function findRoleById(id) {
        try {
            const role = await Role.findByPk(id);
            
            return role;

        } catch (error) {
            throw new Error("Error getting rol: " + error);
        }
    }

        // Método para buscar todos los roles
    async function findAllRoles() {
        try {
            const roles = await Role.findAll();
            
            return roles;
        } catch (error) {
            throw new Error("Error getting roles: " + error);
        }
    }

        // Método para actualizar un rol existente
    async function updateRole(id, updates) {
        try {
            const role = await Role.findByPk(id);

            if (!role) {
                throw new Error('Rol not found.');
            }

            const updatedRole = await role.update(updates);

            return updatedRole;

        } catch (error) {
            throw new Error("Error updating roles: " + error);
        }


    }

        // Método para eliminar un rol
    async function deleteRole(id) {
        try {
            const role = await Role.findByPk(id);
            
            if (!role) {
                throw new Error('Rol not found.');
            }

            const deletedRole = await role.destroy();

            return deletedRole;

        } catch (error) {
             throw new Error("Error deleting roles: " + error);
        }
    }

module.exports = {
    createRole,
    findRoleById,
    findAllRoles,
    updateRole,
    deleteRole
};
