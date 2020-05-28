let usersController = {
    login: function (req, res){
        res.render('login', {title: 'Usuarios'});
    },
};

module.exports =  usersController;
