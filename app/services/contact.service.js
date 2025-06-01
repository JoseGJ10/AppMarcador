const { Contact } = require('../models')

async function createContact(data){

    try {
        const contact = await Contact.create(data);

        return contact;

    } catch (error) {
        throw new Error("Error Creating Contact: " + error);
        
    }

}

async function getContacts(){
    try {
        const contacts = await Contact.findAll();

        return contacts;
        
    } catch (error) {
        throw new Error("Error getting Contacts: " + error);
    }
}

async function getContactById(id) {
    try {
        const contact = await Contact.findByPk(id);

        return contact;
    } catch (error) {
        throw new Error("Error getting a Contact: " + error);
    }
}

async function updateContact(id, data) {
    try {
        const contact = await Contact.findByPk(id);

        if(!contact){
            throw new Error(`ContactId: ${id} not found.`);
        }

        contact.update(data);

        return contact;

    } catch (error) {
        throw new Error("Error updating Contact: " + error);
    }
}

async function deleteContact(id) {
    try {
        const deleteContact = await Contact.destroy({where: {id_contact: id}}) 
        
        return deleteContact
    } catch (error) {
         throw new Error("Error deleting Contact: " + error);
    }
}

module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
}