'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const utilizadorSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: 'Nome do utilizador'
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        unique: false,
        required: true
    },
    dadosPassword: {
        type: {
            hash: String,
            salt: String
        },
        required: true
    }
}, { collection: 'UsersCollection' });
// --------------------------------------------------
// - Métodos associados ao Schema

// ------------------------------
// - setDadosPassword(password):    calcula o hash de uma dada password, e guarda

// -
const crypto = require('crypto');

utilizadorSchema.methods.setDadosPassword = function (textoPassword) {
    const saltUtilizado = crypto.randomBytes(16).toString('hex');
    this.dadosPassword.salt = saltUtilizado;
    this.dadosPassword.hash = crypto.pbkdf2Sync(textoPassword, saltUtilizado, 1000, 64, 'sha512').toString('hex');
};

// --------
// - validarPassword(password)
utilizadorSchema.methods.validarPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.dadosPassword.salt, 1000, 64, 'sha512').toString('hex');
    return this.dadosPassword.hash === hash;
};

// --------
// - gerarJwt()
const jwt = require('jsonwebtoken');
utilizadorSchema.methods.gerarJwt = function () {
    const validade = new Date();
    validade.setDate(validade.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        nome: this.nome,
        exp: parseInt(validade.getTime() / 1000, 10),
    }, 'EMove');
};

// --------------------------------------------------
// - export the Utilizador Schema 
module.exports = mongoose.model('Utilizador', utilizadorSchema);