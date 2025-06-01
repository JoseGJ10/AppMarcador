const {createContact, getContacts, getContactById, updateContact, deleteContact} = require('../services/contact.service');


async function newContact(req, res, next) {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message ) {
            const error = new Error("All fields are required.");
            error.name = "ValidationError"
            error.cause = "Missing fields: name, email, subject, message.",
            error.statusCode = 404
            throw error
        }

        const contact = await createContact({name, email, subject, message});

        res.status(201).json({success: true, data: contact});

    } catch (error) {
        next(error);
    }
}

async function getAllContacts(req,res,next) {
    try {

        const contacts = await getContacts()

        res.status(200).json({success: true, data: contacts});
        
    } catch (error) {
        next(error);
    }
}

async function getOneContactById(req,res,next) {
    try {
        
        const { id } = req.params

        if(!id){
            const error = new Error("fields id is required.");
            error.name = "ValidationError"
            error.cause = "Missing field id",
            error.statusCode = 404
            throw error
        }

        const contact = await getContactById(id)

        res.status(200).json({ success: true, data: contact })

    } catch (error) {
        next(error);
    }
}

async function updateDataContact(req,res,next) {
    try {
        
        const { id } = req.params;
        const { name, email, message, subject, responded } = req.body

        if(!id){
            const error = new Error("Any fields is required.");
            error.name = "ValidationError"
            error.cause = "Missing field name, email, message, subject or responded",
            error.statusCode = 404
            throw error
        }

        if (!name && !email && !message && !subject && !responded){
            const error = new Error("fields id is required.");
            error.name = "ValidationError"
            error.cause = "Missing field id",
            error.statusCode = 404
            throw error
        }
        const contact = await getContactById(id);

        if (name !== undefined) contact.name = name;
        if (email !== undefined) contact.email = email;
        if (message !== undefined) contact.message = message;
        if (subject !== undefined) contact.subject = subject;
        if (responded !== undefined) contact.responded = responded;

        await contact.save();

        res.status(200).json({success: true, data: contact});

    } catch (error) {
        next(error);
    }
}

async function deleteOneContact(req,res,next) {
    try {
        const { id } = req.params;

        if(!id){
            const error = new Error("Any fields is required.");
            error.name = "ValidationError"
            error.cause = "Missing field name, email, message, subject or responded",
            error.statusCode = 404
            throw error
        }

        const deleteContact = await deleteContact(id);

        res.status(200).json({success: true, data: []});

    } catch (error) {
        next(error);
    }
}

module.exports = {
   newContact, 
   getAllContacts, 
   getOneContactById, 
   updateDataContact, 
   deleteOneContact 
}