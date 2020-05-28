const usersController = {
    login: (req, res) => {
        res.render('login', {title: 'Usuarios'});
    },
    register: (req, res) => {

    }
};

module.exports =  usersController;
