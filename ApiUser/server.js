const express = require('express')
const cors = require('cors')

const swaggerUI = require('swagger-ui-express')
// npm install swagger-ui-express

const PORT = 5000

const BD = require('./src/config/configBDMongo');
const UtilizadorModel = require('./src/models/utilizadoresModel');

const AutenticacaoRoutes = require('./src/routes/utilizadorRoutes');


/* documentação da API - Open API
File > Convert and Save as JSON
 */



const openAPIDoc = require('./api-docs/openapi_v0.json')

// configuração do express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization') // 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
});

const passport = require('passport');
require('./src/config/configPassport');

app.use(passport.initialize());

const jwt = require('express-jwt');
const autenticacao = jwt({
    secret: 'EMove',
    userProperty: 'payload',
    algorithms: ['HS256'] // ['rs256',"sha1", "HS256"]
});

// error handlers
//    Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res
            .status(401)
            .json({ "message": err.name + ": " + err.message });
    }
});



// middleware para incluir a documentação OpenAPI
app.use('/api-docs',       // a rota onde a documentação ficará disponível
    swaggerUI.serve,// servidor da documentação
    swaggerUI.setup(openAPIDoc) // documento com a especificação da API

)



// registar as rotas
AutenticacaoRoutes(app);

// module.exports = function (autent, app) {

app.listen(PORT, () =>
    console.log(`servidor a executar em http://localhost:${PORT}`));


