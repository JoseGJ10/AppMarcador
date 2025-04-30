const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');  // Importamos el modelo de usuario
const bcrypt = require('bcrypt');  // Para comparar contraseñas
const dotenv = require('dotenv'); 

dotenv.config();  // Cargamos las variables de entorno               

async function login(req,res,next) {
    try {
        const { username, password } = req.body;

        // Buscamos el usuario en la BBDD
        const user = await User.findOne({ where: { username: username }, include:{ model: Role, attributes: ['id_role', 'name'] } });

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
            userId: user.id_user,
            username: user.username,
            role: user.Role.name,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION} );

        res.status(200).send({success: true, token});

    } catch (error) {
        next (error);
    }
};

async function authenticate (req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({ message: 'Token not provided.' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        next (error);
    }

}

const authorization = (...allowRoles) =>{

    return ( req, res, next) => {
        if (!req.user){
            return res.status(403   ).json({message: 'Access denied: Authentication required'})
        }
        
        if(!allowRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        next();
    }
}

module.exports = { login, authenticate, authorization };