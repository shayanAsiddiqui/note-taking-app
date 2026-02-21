import express from "express";
import {createNote, deleteNote, getAllNotes} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);


export default router;