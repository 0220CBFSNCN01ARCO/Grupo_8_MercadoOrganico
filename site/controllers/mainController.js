const fs = require('fs');
const path = require('path');

/* MAIN CONTROLLER */
const controller = {
    root: (req, res, next) => {
        res.render('index', {title: 'Express'});
    }
};

module.exports = controller;