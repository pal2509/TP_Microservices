'use strict'
module.exports = function (app) {
    const utilizadorCtrl =
        require('../controllers/utilizadorController');

    // rotas definidas para a API Restful utilizadores / autenticação

    // -- rota  /registar    métodos: POST
    app.route('/registar')
        .post(utilizadorCtrl.registar_utilizador);

    // -- rota  /login    métodos: POST
    app.route('/login')
        .post(utilizadorCtrl.autenticar);

}