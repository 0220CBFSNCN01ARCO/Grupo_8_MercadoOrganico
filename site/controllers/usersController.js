const fs = require('fs'); //
const path = require('path'); //
const bcrypt = require('bcrypt');
const multer = require('multer');

const { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    formRegister: (req, res) => {
        let userToReload;
        res.render('register', {
            title: 'Registrar Usuario',
            user: req.session.usuarioLogeado,
            userToReload
        });
    },

    register: (req, res) => {
        let errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            const userToReload = {
                name: req.body.nombre,
                last_name: req.body.apellido,
                email: req.body.email
            };
            return res.render('register', {
                title: 'Register',
                errors: errors.errors,
                userToReload: userToReload,
                user: req.session.usuarioLogeado
            });
        };
        console.log(req.body);
        db.User.create({
            name: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.file.filename,
            id_type: 0
        }).then(() => {
            res.redirect('/users/login');
        }).catch(err => {
            console.error(err);
            res.send('ERROR AL REGISTRARSE!');
        });
    },

    login: (req, res) => {
        let usuario = req.session.usuarioLogeado;
        res.render('login', {
            title: 'Login',
            user: usuario
        });
    },
    processLogin: async (req, res) => {
        try {
            let usuarios = await db.User.findAll();
            let usuarioALogearse;
            for(let i=0; i < usuarios.length; i++){
                if(usuarios[i].email == req.body.email){
                    if(bcrypt.compareSync(req.body.password, usuarios[i].password)){
                        usuarioALogearse = usuarios[i];
                        break;
                    };
                };
            };
            if (usuarioALogearse == undefined) {
                return res.render('login', {
                    title: 'Login',
                    errors: [
                        { msg: 'Usuario inválido' }
                    ],
                    user: usuario
                });
            };
            req.session.usuarioLogeado = usuarioALogearse;
            return res.render('success', {
                usuario: req.session.usuarioLogeado
            });
        } catch (error) {
            return res.send('Ocurrió un error');
        };
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/');
    },
    card: (req, res) => {
        res.render('tarjeta', { title: 'Registrar Tarjeta' });
    },
};

module.exports = usersController;
