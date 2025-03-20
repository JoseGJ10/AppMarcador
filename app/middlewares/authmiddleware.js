const jwt = require('jsonwebtoken');
const { User } = require('../models');  // Importamos el modelo de usuario
const bcrypt = require('bcrypt');  // Para comparar contraseñas

async function login(req,res,next) {
    try {
        const { username, password } = req.body;

        // Buscamos el usuario en la BBDD
        const user = await User.findOne({ where: { username: username }});

        if (!user) {
            return res.status(401).json({ message: 'user don`t found in database.' });
        }

        //Comparamos las contraseñas
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        //Generamos el token JWT
        const payload = {
            userId: user.id,
            username: user.username,
            role: user.role,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expireIn: process.env.JWT_EXPIRATION,} );

        res.status(200).send({success: true, token});

    } catch (error) {
        next (error);
    }
};

module.exports = { login };