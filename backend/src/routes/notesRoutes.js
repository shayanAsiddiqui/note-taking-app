import express from "express";
import { requireAuth } from '@clerk/express'; // 🔥 1. Import the bouncer
import {createNote, deleteNote, getAllNotes, getNote, updateNote} from "../controllers/notesController.js";

const router = express.Router();

// 🔥 2. Put the bouncer at the door for ALL routes in this file
router.use(requireAuth()); 

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", getNote)
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;