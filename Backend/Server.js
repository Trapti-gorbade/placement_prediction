import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./Routes/UserRoutes.route.js";
import { connectDB } from "./DB/db.js";

dotenv.config(); 
const app = express();
const mongo_db_uri = process.env.MONGO_DB;
const PORT = process.env.PORT || 8000; 

app.use(cors());
app.use(express.json()); 


app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});

connectDB(mongo_db_uri);
 

app.use("/api/auth", router); 

