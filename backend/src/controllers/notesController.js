import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        // 🔥 Grab the ID of the person making the request
        const userId = req.auth.userId; 
        
        // 🔥 Only find notes that belong to THIS user
        const notes = await Note.find({ userId }).sort({ createdAt: -1 });
        
        res.status(200).json(notes);
    } catch(err) {
        console.error("getAllNotes", err);
        res.status(500).json({ message : "Internal Server Error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const userId = req.auth.userId; // 🔥 Grab the ID

        // 🔥 Attach the ID to the note before saving
        const note = new Note({ title, content, userId });

        const savedNote = await note.save();

        res.status(201).json(savedNote);
    } catch(error) {
        console.error("createNote", error);
        res.status(500).json({ message : "Internal Server Error" });
    }
}

export async function deleteNote(req, res) {
  try {
    const userId = req.auth.userId;
    
    // 🔥 Security check: Find by Note ID *AND* User ID
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId });
    
    if (!deletedNote) return res.status(404).json({ message: "Note not found or unauthorized" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const userId = req.auth.userId;

        // 🔥 Security check: Find by Note ID *AND* User ID
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, userId },
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message : "Note not found or unauthorized" });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("updateNote", error);
        res.status(500).json({ message : "Internal Server Error" });
    }
}

export async function getNote(req, res) {
    try {
        const userId = req.auth.userId;
        
        // 🔥 Security check: Find by Note ID *AND* User ID
        const note = await Note.findOne({ _id: req.params.id, userId });
        
        if (!note) {
            return res.status(404).json({ message: "Note not found or unauthorized" });
        }
        res.status(200).json(note);
    } catch(error) {
        console.error("getNote", error);
        res.status(500).json({ message : "Internal Server Error" });
    }
}