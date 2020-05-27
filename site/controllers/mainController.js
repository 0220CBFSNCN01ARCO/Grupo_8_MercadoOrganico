const fs = require('fs');
const path = require('path');

/* MAIN CONTROLLER */
const controller = {
    root: (req, res, next) => {
        res.render('index', {title: 'Home'});
    },
};

module.exports = controller;