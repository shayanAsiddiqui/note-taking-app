export function getAllNotes (req, res){
    res.status(200).send("You just fetched the notes");
}
export function createNote (req, res){
    res.status(201).send("You just posted the note");
}
export function deleteNote (req, res){
    res.status(200).send("You just deleted the note");
}
export function updateNote (req, res){
    res.status(200).send("You just updated the note");
}