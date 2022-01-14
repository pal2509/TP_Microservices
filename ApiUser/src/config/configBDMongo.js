
const mongoose = require('mongoose');

const mongodb = {
    pathLocalhost: 'mongodb://127.0.0.1/TP_AIS_User',
    pathAtlas: 'mongodb+srv://...',
};

const urlBaseDados = mongodb.pathLocalhost
mongoose.connect(
    urlBaseDados,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose ligado a ${urlBaseDados}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose erro ao conectar: ', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose: foi desligada a ligação. ');
});
