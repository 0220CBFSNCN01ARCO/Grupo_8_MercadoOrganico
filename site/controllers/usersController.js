const fs = require('fs'); //
const path = require('path'); //
const bcrypt = require('bcrypt');
const multer = require('multer');

const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    formRegister: (req, res) => {
        let usuario = req.session.usuarioLogeado;
        res.render('register', {
            title: 'Registrar Usuario',
            user: usuario
        });
    },
   
    register: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
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
            admin: false,
            telefono: body.telefono,
            password: bcrypt.hashSync(body.password, 10),
            avatar: req.file.filename,
        };
        users.push(usuarioAGuardar);
        fs.writeFileSync('data/users.json', JSON.stringify(users));
        res.redirect('/users/login');
    } else {
        return res.render('register', {
            title: 'Error',
            user: req.session.usuarioLogeado,
            errors: errors.errors
        })
    }
    },
    
    login: (req, res) => {
        let usuario = req.session.usuarioLogeado;
        res.render('login', {
            title: 'Login',
            user: usuario
        });
    },
    processLogin: (req, res) => {
        let usuario = req.session.usuarioLogeado;
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('login', {
                title: 'Login',
                errors: errors.errors,
                user: usuario
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
                ],
                user: usuario
            });
        };
        req.session.usuarioLogeado = usuarioALogearse;
        return res.render('success', {
            usuario: req.session.usuarioLogeado
        });
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/');
    },
    card: (req, res) => {
        res.render('tarjeta', {title: 'Registrar Tarjeta'});
    },
};

module.exports =  usersController;
