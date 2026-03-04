import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { clerkMiddleware } from '@clerk/express'; // 🔥 1. IMPORT CLERK MIDDLEWARE

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://note-taking-7oxt.vercel.app"
      ],
    })
  );
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body

// 🔥 QUICK TIP: If this rate limiter is annoying you while testing, 
// you can comment out the line below until we are ready for production!
app.use(rateLimiter); 

// 🔥 2. ADD CLERK MIDDLEWARE TO THE APP
// This intercepts requests, checks for a token, and extracts the user's ID
app.use(clerkMiddleware());

// Routes
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});