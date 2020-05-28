const fs = require('fs');
const path = require('path');

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
    }
};

module.exports =  usersController;
