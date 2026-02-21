import express from "express";
import {createNote, deleteNote, getAllNotes, getNote, updateNote} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.get("/:id", getNote)
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);



export default router;