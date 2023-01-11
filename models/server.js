import express from "express"
import cors from "cors"
//Importacion de conexion
import dbConnection from "../database/config.db.js"
//Importacion de rutas
import userRouter from "../routes/user.routes.js"
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath='/api/users'
        //conexion a base de datos
        this.connectToDb()
        //Rutas aplicacion
        this.middlewares();
        this.routes();
       
        //Middlewares


    }

    async connectToDb(){
     await dbConnection()
    }
    middlewares() {
        //directorio publico
        this.app.use(express.static('public'))
        this.app.use(cors())
        //Lectura y parseo del body
        this.app.use(express.json())
      
    }
    routes() {
      this.app.use(this.usersPath,userRouter)
      
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Starting at localhost:${this.port}`)
        })
    }
}

export default Server