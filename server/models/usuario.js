const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rolesValidos = {
    values: ['SUPER_ROLE' ,'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario man']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'Password obligatorio']
    },
    img: {
        type: String,
        required: false
    }, 
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos,
        required: true
    }, 
    estado: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;

    return userObject
}

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'})

module.exports = mongoose.model('Usuario', usuarioSchema)