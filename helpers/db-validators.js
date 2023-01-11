
import role from "../models/role.js"
import Usuario from "../models/Usuario.js"
const esRoleValido=async (rol='')=>{
    const existeRol=await role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailExists=async(email='')=>{
    const existeEmail=await Usuario.findOne({correo:email})

    if(existeEmail){
        throw new Error(`El email ${email} ya existe en la base de datos` )
    }
}

const usuarioByIdExists=async(id='')=>{
    const existeUsuario=await Usuario.findById(id)

    if(!existeUsuario){
        throw new Error(`No existe un usuario con el id ${id} en la base de datos`)
    }
}
export {esRoleValido,emailExists,usuarioByIdExists}