const fs = require('fs');
const path = require('path');

// const usersFilePath = path.join(__dirname, '../data/users.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    login: (req, res) => {
        res.render('login', {title: 'Usuarios'});
    },
    register: (req, res) => {

    }
};

module.exports =  usersController;
