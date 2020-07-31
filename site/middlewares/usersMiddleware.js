/* const { check, valiationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const reglaValidacionesUsuarios = () => {
    return [body('email').custom( async value => {
        let user = await db.User.findOne({
            where: {
                email: value
            }
        });
        if (user) {
            return Promise.reject();
        }
    }).withMessage('El email ya está registrado'), check("password", "Password Invalido, mínimo 4 caracteres.")
    .isLength({ min: 4 })
    .custom((value, { req}) => {
        if (value !== req.body.repeatPassword) {
            throw new Error("Los passwords no coinciden.");
        } else {
            return value;
        }
    })
]
};
