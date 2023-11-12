import { useState, useEffect } from "react"
import NotesForm from "./Components/NotesForm.js";
import NotesList from "./Components/NotesList.js";

function App() {

  const [notes, setNotes] = useState([])
  const [noteToEdit, setNoteToEdit] = useState(null)
  const [categories, setCategories] = useState([])

  // fetching data
  const fetchNotes = () => {
    fetch("http://localhost:1234/notes?_expand=category")
    .then(r => r.json())
    .then(d => setNotes(d))
    .catch(e => console.log("Error during fetching notes", e))
  }

  const fetchCategories = () => {
    fetch("http://localhost:1234/categories")
    .then(r => r.json())
    .then(d => setCategories(d))
    .catch(e => console.log("Error during fetching categories", e))
  }

  // crud
  const edit = (id) => {
    let n = notes.filter(n => n.id === id)[0]
    setNoteToEdit(n)
  }

  const remove = (id) => {
    fetch("http://localhost:1234/notes/" + id, {
      method: "DELETE"
    }).then(r => r.json())
    .then(d => {
      fetchNotes()
    })
    .catch(e => console.log("Error during removing Note", e))
  }

  // filter
  const filterByCategory = (id) => {
    if(id === 0) {
      // reset filter
      fetchNotes()
    } else {
      fetch("http://localhost:1234/notes?_expand=category&categoryId=" + id)
      .then(r => r.json())
      .then(d => setNotes(d))
      .catch(e => console.log("Error during filtering notes by category", e))
    }
  }

  // init
  useEffect(() => {

    if(notes.length == 0) {
      fetchNotes()
    }

    if(categories.length == 0) {
      fetchCategories()
    }
  },[notes, noteToEdit])

  return (
    <div className="App">
      <NotesForm categoriesList={categories} handle={setNotes} note={noteToEdit}/>
      <NotesList filterByCategory={filterByCategory} categoriesList={categories} notes={notes} edit={edit} remove={remove} />
    </div>
  );
}

export default App;
