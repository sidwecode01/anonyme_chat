import { connect } from "http2";
import mongoose from "mongoose";

 const connect = async () => {

     try{
          await mongoose.connect(process.env.local.MONGO_URI, {
             useNewUrlParser: true,
             useUnifiedTopology: true
         });
         console.log("Connexion successful");
         
     } catch (error){
         throw new Error ("Error in connecting to mongodb")
     };
 }

export default connect;