import express from "express";
const app = express();

app.get('/api/notes', (req, res) => {
    res.status(200).send("You got 5 notes");
})

app.post('/api/notes', (req, res) => {
    res.status(201).send("Your note has been created successfully");
})

app.listen(5001, ()=>{
    console.log("Server running on port 5001");
})