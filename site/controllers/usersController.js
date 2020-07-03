const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const multer = require('multer');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    root: (req, res) => {
        res.render('usuario', {title: 'Usuario'});
    },
    login: (req, res) => {
        res.render('login', {title: 'Login'});
    },
    formRegister: (req, res) => {
        res.render('register', {title: 'Registrar Usuario'});
    },
    card: (req, res) => {
        res.render('tarjeta', {title: 'Registrar Tarjeta'});
    },
    register: (req, res) => {
        const body = req.body;
        if(body.password != body.repeat_password){
            return res.render('contrasenaNoCoincide');
        };
        console.log(req.file);
        const cantidadUsuarios = users.length;
        const nuevoID = cantidadUsuarios + 1;
        //datos que llegan en la peticion
        const usuarioAGuardar = {
            id: nuevoID,
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            telefono: body.telefono,
            password: bcrypt.hashSync(body.password, 10),
            avatar: req.file.filename,
        };
        users.push(usuarioAGuardar);
        fs.writeFileSync('data/users.json', JSON.stringify(users));
        res.render('usuarioExitoso');
    },
};

module.exports =  usersController;
