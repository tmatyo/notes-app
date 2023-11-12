import { useState, useEffect } from "react"
import NotesForm from "./Components/NotesForm.js";
import NotesList from "./Components/NotesList.js";

function App() {

  const [notes, setNotes] = useState([])

  const fetchData = () => {
    console.log(notes)
    console.log(notes.length)
    if(notes.length == 0) {
      fetch("http://localhost:1234/notes?_expand=category")
      .then(r => r.json())
      .then(d => setNotes(d))
    }
  }

  const edit = () => {

  }

  const remove = (id) => {
    fetch("http://localhost:1234/notes/" + id, {
      method: "DELETE"
    }).then(r => r.json())
    .then(d => {
      console.log(d)
      setNotes([])
    })
    .catch(e => console.log(e))
  }

  useEffect(() => fetchData(),[notes])

  return (
    <div className="App">
      <NotesForm handle={setNotes}/>
      <NotesList notes={notes} edit={edit} remove={remove} />
    </div>
  );
}

export default App;
