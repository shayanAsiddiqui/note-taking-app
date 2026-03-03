import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import api from '../lib/axios.js'

export function useNotes() {
  const { isSignedIn } = useUser()
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const syncAndLoadNotes = async () => {
      if (isSignedIn) {
        // --- THE MIGRATION LOGIC STARTS HERE ---
        const localNotes = localStorage.getItem('notes')

        if (localNotes) {
          const parsedNotes = JSON.parse(localNotes)

          // If there is at least one local note, ask the user what to do
          if (parsedNotes.length > 0) {
            const wantsToSync = window.confirm(`You have ${parsedNotes.length} offline note(s). Do you want to sync them to your account?`)

            if (wantsToSync) {
              try {
                // We only send 'title' and 'content' because your MongoDB backend 
                // generates its own official '_id' and 'createdAt' fields.
                const syncPromises = parsedNotes.map(note => 
                  api.post("/notes", { title: note.title, content: note.content })
                )
                
                // Promise.all runs all the API calls at the exact same time
                await Promise.all(syncPromises)
                console.log("Successfully synced all offline notes to the backend!")
              } catch (error) {
                console.log("Error syncing offline notes:", error)
              }
            }
          }
          // Wipe the local storage clean so we don't prompt them again next time
          localStorage.removeItem('notes')
        }
        // --- THE MIGRATION LOGIC ENDS HERE ---

        // Now, fetch the official notes from the backend (including the newly synced ones)
        try {
          const res = await api.get("/notes")
          setNotes(res.data)
        } catch (error) {
          console.log("Error fetching backend notes:", error)
        }

      } else {
        // If signed OUT, just load the local storage normally
        const savedNotes = localStorage.getItem('notes')
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes))
        }
      }
    }

    syncAndLoadNotes()
  }, [isSignedIn])

  const addNote = async (newNote) => {
    if (isSignedIn) {
      try {
        const res = await api.post("/notes", newNote)
        setNotes([...notes, res.data])
      } catch (error) {
        console.log("Error creating note:", error)
        throw error
      }
    } else {
      const noteWithId = {
        ...newNote,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }
      const updatedNotes = [...notes, noteWithId]
      setNotes(updatedNotes)
      localStorage.setItem('notes', JSON.stringify(updatedNotes))
    }
  }

  const deleteNote = async (noteId) => {
    if (isSignedIn) {
      try {
        await api.delete(`/notes/${noteId}`)
        setNotes(notes.filter(note => note._id !== noteId))
      } catch (error) {
        console.log("Error deleting note:", error)
        throw error
      }
    } else {
      const updatedNotes = notes.filter(note => note._id !== noteId)
      setNotes(updatedNotes)
      localStorage.setItem('notes', JSON.stringify(updatedNotes))
    }
  }

  return {
    notes,
    addNote,
    deleteNote,
    updateNote: () => {}
  }
}