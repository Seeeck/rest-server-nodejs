
import { response, request } from "express"
import Usuario from "../models/Usuario.js"
import bcrypt from "bcryptjs"

const usuariosGet =async (req = request, res = response) => {
    /* const query = req.query */
    const {limit=5,desde=0}=req.query
    const query={estado:true}
   

    const [data]=await Promise.all([
        Usuario.find(query).limit(limit).skip(desde),
        
    ])

 
    res.json({data,total:data.length} )

}

const usuarioPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    //verificar el correo si existe
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        return res.status(400).json({
            code: 400,
            msg: "EL correo ya se encuentra registrado"
        })
    }
    //encriptar la password
    var salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);
    //guardar el usuario

    await usuario.save()
    res.json({ usuario })
}

const usuarioPut = async(req = request, res) => {
    const { id } = req.params
    const {_id, password, google,correo, ...resto } = req.body

    //TODO validar contra base de datos
    if (password) {
        var salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario=await Usuario.findByIdAndUpdate(id,resto,{new:true})
  
    res.json(usuario)
}

const usuarioDelete = async (req, res) => {
    const {id} =req.params

    const usuarioBorrado=await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({ msg:`Usuario borrado`,usuario:usuarioBorrado })
}

export { usuariosGet, usuarioPost, usuarioPut, usuarioDelete }