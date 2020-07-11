const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    formRegister: (req, res) => {
        res.render('register', {title: 'Registrar Usuario'});
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
        res.redirect('/users/login');
    },
    login: (req, res) => {
        res.render('login', {
            title: 'Login'
        });
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('login', {
                title: 'Login',
                errors: errors.errors
            })};
        let usuarioALogearse;
        for(let i = 0; i < users.length; i++){
            if(users[i].email == req.body.email){
                if(bcrypt.compareSync(req.body.password, users[i].password)){
                    usuarioALogearse = users[i];
                    break;
                };
            };
        };
        if(usuarioALogearse == undefined){
            return res.render('login', {
                title: 'Login',
                errors: [
                    {msg: 'Usuario inválido'}
                ]
            });
        };
        req.session.usuarioLogeado = usuarioALogearse;
        res.render('success', {
            usuario: req.session.usuarioLogeado
        });
    },
    card: (req, res) => {
        res.render('tarjeta', {title: 'Registrar Tarjeta'});
    },
};

module.exports =  usersController;
