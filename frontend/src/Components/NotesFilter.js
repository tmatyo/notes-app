import { ButtonGroup, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { fetchNotes, filterBy, search } from "../Provider/noteSlice"
import { FormControl, TextField } from '@mui/material'

const NotesFilter = ({categoriesList, notesCount}) => {

    const dispatch = useDispatch()

    const searchQuery = (query) => {
        if(query.length >= 3) {
            dispatch(search(query))
        }
    }

    return (
        <>
        <div className="notes-search card">
            <span className="notes-search-label">Search (enter at least 3 characters):</span>
            
            <FormControl className="form-items">
                    <TextField 
                    id="search" 
                    label="Search" 
                    variant="outlined"
                    size="small" 
                    onChange={e => searchQuery(e.target.value)}  />
                </FormControl>
        </div>
        <div className="notes-filter card">
            <span>Notes count: {notesCount}</span>
            <ButtonGroup className="notes-filter-buttons" variant="outlined" size="small" aria-label="small button group">
                <Button key={0} onClick={() => dispatch(fetchNotes())} >Reset</Button>
            </ButtonGroup>
            <ButtonGroup className="notes-filter-buttons" variant="outlined" size="small" aria-label="small button group">                
                { categoriesList.map(c => <Button key={c.id} onClick={() => dispatch(filterBy(c.id))}>{c.name}</Button>)}
            </ButtonGroup>
        </div>
        </>
    )
}

export default NotesFilter