
import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'La contrasenia es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: [true, 'EL rol es requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})


UsuarioSchema.set('toJSON', {
    transform: function(doc, ret, options) {
      // Destructuramos el objeto para eliminar la propiedad 'age'
      const { password,__v, ...newObj } = ret;
      return newObj;
    }
  });
export default model('Usuario', UsuarioSchema)