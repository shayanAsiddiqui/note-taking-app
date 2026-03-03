import { useState, useEffect } from 'react'
import {useUser } from '@clerk/clerk-react'

export function useNotes(){
    const { isSignedin } = useUser()
    const [notes, setNotes] = useState([])

    useEffect(()=>{
        if(!isSignedin){
            const savedNotes = localStorage.getItem("notes");
            if(savedNotes){
                setNotes(JSON.parse(savedNotes))
            }
        }
    }, [isSignedin])

    const addNote = (newNote) => {
        const noteWithId = {
            ...newNote,
            _id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        }
        const updatedNotes = [...notes, noteWithId]
        setNotes(updatedNotes)

        if(!isSignedin){
            localStorage.setItem("notes", JSON.stringify(updatedNotes))
        }
    }

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note._id !== id)
        setNotes(updatedNotes)

        if(!isSignedin){
            localStorage.setItem("notes", JSON.stringify(updatedNotes))
        }
    }


    return {
        notes,
        addNote,
        deleteNote,
        updateNote: ()=>{}
    }
}