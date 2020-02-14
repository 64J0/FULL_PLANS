const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    /*
    name: {
        type: String,
        required: true,
    },
    */
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Funcionalidade do Mongoose chamada middlewares (também conhecido como pre e post hooks). Neste trecho de código usamos o pre save, ou seja, esse código será automaticamente executado sempre antes da função save do Model.
UserSchema.pre('save', async function(next) {

    try {
        const hash = await bcrypt.hash(this.senha, 10);
        this.senha = hash;
    } catch(err) {
        console.log(err);
    }

    next();
});

module.exports = mongoose.model('User', UserSchema); 