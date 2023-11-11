import { TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material"
import { useState, useEffect } from "react"
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function NotesForm() {

    // form state
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState(0)
    const [description, setDescription] = useState("")

    const [categories, setCategories] = useState([])
    const [pending, setPending] = useState(false)

    // save note
    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(title, category, description)

        setPending(true)

        let result = await fetch("http://localhost:1234/notes", {
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({title, categoryId: category, description})
        })
        .then(r => r.json())
        .then(()=> setPending(false))

        console.log(result)
    }

    // get existing categories on component load
    useEffect(() => {
        fetch("http://localhost:1234/categories")
        .then(r => r.json())
        .then(d => setCategories(d))
    }, [])

    return (
        <div className="notes-form card">
            <h2>Add note</h2>
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