import { Router } from "express";
import {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete
} from "../controllers/user.controller.js"
import { check } from "express-validator";
import validarCampos from "../middlewares/validar-campos.js";
import { emailExists, esRoleValido ,usuarioByIdExists} from "../helpers/db-validators.js";


const userRouter = Router()

userRouter.get('/', usuariosGet)
userRouter.put('/:id',[
check('id','No es un id valido').isMongoId().custom(usuarioByIdExists),
check('rol').custom(esRoleValido),
validarCampos
] ,usuarioPut)
userRouter.post('/',[
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('password',"El password debe ser mas de 6 letras").not().isEmpty().isLength({min:6}),
   /*  check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), */
    check('correo','Debe ser un correo valido').custom(emailExists).isEmail(),
    check('rol').custom(esRoleValido),
    validarCampos
], usuarioPost)
userRouter.delete('/:id',
[
    check('id','No es un id valido').isMongoId().custom(usuarioByIdExists),   
    validarCampos
]
, usuarioDelete)


export default userRouter
