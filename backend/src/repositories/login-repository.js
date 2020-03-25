const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.verifyUser = async (data) => {
    try {
        const user = await User.findOne({ 'email': data.email }).select('+senha');
        return user;
    } catch(err) {
        console.log(err);
    }
}

exports.create = async (data) => {
    try {
        if (await User.findOne({ 'email': data.email })) {
            console.log('E-mail já cadastrado');
            return null;
        } else {
            const usuario = new User(data);
            usuario.password = undefined;
            await usuario.save();
            return usuario;
        }
    } catch(err) {
        console.log('Usuário NÃO cadastrado');
        console.log(err);
        return null;
    }  
}

exports.list = async () => {
    const res = await User.find({});
    return res;
}