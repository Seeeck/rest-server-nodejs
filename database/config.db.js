import mongoose from "mongoose"

const dbConnection=async()=>{
    try{
        mongoose.set("strictQuery", false);
        return await mongoose.connect(process.env.MONGODB_CNN)
      
       
    }catch(error){
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
    }
}

export default dbConnection