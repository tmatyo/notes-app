import { useEffect } from "react"
import NotesForm from "./Components/NotesForm.js";
import NotesList from "./Components/NotesList.js";

import { useSelector, useDispatch } from 'react-redux'
import { fetchNotes, fetchCategories } from "./Provider/noteSlice.js";

function App() {

  const notes = useSelector(state => state.note.notes)
  const categories = useSelector(state => state.note.categories)

  const dispatch = useDispatch()

  // init
  useEffect(() => {
    if(notes.length == 0) {
      dispatch(fetchNotes())
    }

    if(categories.length == 0) {
      dispatch(fetchCategories())
    }
  }, [notes])

  return (
    <div className="App">
      <NotesForm categories={categories} />
      <NotesList  categoriesList={categories} notes={notes}  />
    </div>
  );
}

export default App;
