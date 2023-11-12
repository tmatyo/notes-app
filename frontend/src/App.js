import { useState, useEffect } from "react"
import NotesForm from "./Components/NotesForm.js";
import NotesList from "./Components/NotesList.js";

function App() {

  const [notes, setNotes] = useState([])
  const [noteToEdit, setNoteToEdit] = useState(null)

  const fetchData = () => {
    if(notes.length == 0) {
      fetch("http://localhost:1234/notes?_expand=category")
      .then(r => r.json())
      .then(d => setNotes(d))
      .catch(e => console.log("Error during fetching notes", e))
    }
  }

  const edit = (id) => {
    let n = notes.filter(n => n.id === id)[0]
    setNoteToEdit(n)
  }

  const remove = (id) => {
    fetch("http://localhost:1234/notes/" + id, {
      method: "DELETE"
    }).then(r => r.json())
    .then(d => {
      setNotes([])
    })
    .catch(e => console.log("Error during removing Note", e))
  }

  useEffect(() => fetchData(),[notes, noteToEdit])

  return (
    <div className="App">
      <NotesForm handle={setNotes} note={noteToEdit}/>
      <NotesList notes={notes} edit={edit} remove={remove} />
    </div>
  );
}

export default App;
