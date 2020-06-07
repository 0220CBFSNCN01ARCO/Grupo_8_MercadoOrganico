const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    root: (req, res) => {
        res.render('usuario', {title: 'Usuario'});
    },
    login: (req, res) => {
        res.render('login', {title: 'Login'});
    },
    register: (req, res) => {
        res.render('register', {title: 'Registrar Usuario'});
    },
    card: (req, res) => {
        res.render('tarjeta', {title: 'Registrar Tarjeta'});
    },
    crearcuenta: (req, res) => {
        res.render('crearcuenta', {title: 'Crear Cuenta'});
    },
    registrarcuenta: (req, res) => {
        const body = req.body;

        //comparacion de contraseñas
        if(body.password != body.repeat_password){
            return res.render('contrasenaNoCoincide');
        };

        //datos que llegan en la peticion
        const usuarioAGuardar = {
            nombre: body.nombre_usuario,
            email: body.email,
            telefono: body.telefono,
            password: bcrypt.hashSync(body.password, 10)
        };


        fs.appendFileSync('data/users.json', JSON.stringify(usuarioAGuardar) + '\n');

        return res.render('usuarioExitoso');
    }
};

module.exports =  usersController;
