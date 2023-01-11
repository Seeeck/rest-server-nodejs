
import { validationResult } from "express-validator"
const validarCampos=(req,res,next)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({code:400,errors})
    }
    //El next es para que siga haciendo el controlador o el siguiente middleware
    next()
}

export default validarCampos;