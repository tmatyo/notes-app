import { TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"
import { useState, useEffect } from "react"
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function NotesForm({handle, note, categoriesList}) {

    // form state
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState(0)
    const [description, setDescription] = useState("")

    // if set, form is in edit mode
    const [noteId, setNoteId] = useState(null)

    const [categories, setCategories] = useState([])
    const [pending, setPending] = useState(false)

    const resetForm = () => {
        setPending(false)
        setNoteId(null)
        setTitle("")
        setCategory(0)
        setDescription("")
    }

    // save note
    const handleSubmit = (e) => {
        e.preventDefault()
        let apiUrl = "http://localhost:1234/notes"
        let options = {
            title, 
            categoryId: category, 
            description
        }
        let method = noteId ? "PUT" : "POST"

        // trigger loading animation
        setPending(true)

        // if noteId is defined, we are editing
        if(noteId) {
            options.id = noteId
            apiUrl += "/" + noteId
        }

        fetch(apiUrl, {
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify(options)
        })
        .then(r => r.json())
        .then(()=> {
            // stop loading animation
            setPending(false)
            resetForm()
            // trigger state change, so list rerenders
            handle([])
        }).catch(e => {
            console.log('Error during creating Note', e)
            resetForm()
        })
    }

    // get existing categories on component load
    useEffect(() => {

        if(note) {
            setNoteId(note.id)
            setTitle(note.title)
            setCategory(note.categoryId)
            setDescription(note.description)
        }

        if(categoriesList.length > 0) {
            setCategories(categoriesList)
        }

    }, [note, categoriesList])

    return (
        <div className="notes-form card">
            <h2>{ noteId ? "Editing note #" + noteId : "Add note"}</h2>
            <form onSubmit={handleSubmit} className="the-form">
                <FormControl className="form-items">
                    <TextField id="Title" label="Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)} />
                </FormControl>

                <FormControl className="form-items">
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category} label="Category" onChange={e => setCategory(e.target.value)} >
                        <MenuItem value={0}>Choose category...</MenuItem>
                        { categories.map(c => (<MenuItem value={c.id} key={c.id}>{c.name}</MenuItem>)) }
                    </Select>
                </FormControl>

                <FormControl className="form-items">
                    <TextareaAutosize value={description} aria-label="minimum height" label="Description" minRows={3} placeholder="Description goes here" onChange={e => setDescription(e.target.value)} />
                </FormControl>

                <Button className="form-items" type="submit" variant="contained">
                    <NoteAddIcon className={pending ? "rotate-icon" : ""} /> Create note
                </Button>

            </form>
        </div>
    )
}

export default NotesForm