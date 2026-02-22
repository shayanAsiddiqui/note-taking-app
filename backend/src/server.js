import express from "express";
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes",notesRoutes);


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server running on port ",PORT);
    })
})




