import mongoose from "mongoose";
import colors from "colors"

const connectDB = async()=>{
    
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            dbName:"virtual_mall",
            useUnifiedTopology:true,
            useNewUrlParser : true,
            
        })
        console.log(`MongoDB connected: ${conn.connection.host}`.blue)
    }catch(error){        
        console.log(`Error:${error.message}`.red)
        process.exit(1)
    }
}

export default connectDB