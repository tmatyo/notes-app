import { TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { useSelector, useDispatch } from "react-redux"
import { createNote, editNote, setTitle, setCategoryId, setDescription} from '../Provider/noteSlice'

function NotesForm({categories}) {

    const dispatch = useDispatch()
    const note = useSelector(state => state.note.note)
    const edit = useSelector(state => state.note.edit)

    // save note
    const handleSubmit = (e) => {
        e.preventDefault()

        if(edit) {
            dispatch(editNote({
                id: edit, 
                title: note.title, 
                categoryId: note.categoryId, 
                description: note.description}))
        } else {
            dispatch(createNote(note))
        }
    }

    return (
        <div className="notes-form card">
            <h2>{ edit ? "Editing note #" + edit : "Add note"}</h2>
            <form onSubmit={handleSubmit} className="the-form">
                <FormControl className="form-items">
                    <TextField 
                    id="Title" 
                    label="Title (Max 50 characters)" 
                    variant="outlined" 
                    value={note.title} 
                    onChange={e => dispatch(setTitle(e.target.value))} 
                    maxLength="50"
                    required />
                </FormControl>

                <FormControl className="form-items">
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select 
                    labelId="demo-simple-select-label" 
                    id="demo-simple-select" 
                    value={note.categoryId} 
                    label="Category" 
                    onChange={e => dispatch(setCategoryId(e.target.value))}
                    required >
                        <MenuItem value="">Choose category...</MenuItem>
                        { categories.map(c => (<MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>)) }
                    </Select>
                </FormControl>

                <FormControl className="form-items">
                    <TextareaAutosize 
                    value={note.description} 
                    aria-label="minimum height" 
                    label="Description (Max 256 characters)" 
                    minRows={7} 
                    placeholder="Description (Max 256 characters)" 
                    onChange={e => dispatch(setDescription(e.target.value))}
                    maxLength="256"
                    required />
                </FormControl>

                <Button className="form-items" type="submit" variant="contained">
                    <NoteAddIcon /> Create note
                </Button>

            </form>
        </div>
    )
}

export default NotesForm