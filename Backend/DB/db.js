import mongoose from "mongoose"
let connection = null
export const connectDB=async(mongo_db_uri)=>{
    try{
        if(connection === null)
        {
            connection = await mongoose.connect(mongo_db_uri);
            console.log("Database Connected Successfully");
        }
        
        return connection.connection
    }
    catch(er)
    {
        console.log(er)
    }
    
}