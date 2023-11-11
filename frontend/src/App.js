import { useState, useEffect } from "react"
import NotesForm from "./Components/NotesForm.js";
import NotesList from "./Components/NotesList.js";

function App() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
      fetch("http://localhost:1234/notes?_expand=category")
      .then(r => r.json())
      .then(d => setNotes(d))
  },[notes])

  return (
    <div className="App">
      <NotesForm />
      <NotesList notes={notes} />
    </div>
  );
}

export default App;
