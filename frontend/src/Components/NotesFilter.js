import { ButtonGroup, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { fetchNotes, filterBy } from "../Provider/noteSlice"

const NotesFilter = ({categoriesList, notesCount}) => {

    const dispatch = useDispatch()

    return (
        <div className="notes-filter card">
            <span>Notes count: {notesCount}</span>
            <ButtonGroup className="notes-filter-buttons" variant="outlined" size="small" aria-label="small button group">
                <Button key={0} onClick={() => dispatch(fetchNotes())} >Reset</Button>
            </ButtonGroup>
            <ButtonGroup className="notes-filter-buttons" variant="outlined" size="small" aria-label="small button group">                
                { categoriesList.map(c => <Button key={c.id} onClick={() => dispatch(filterBy(c.id))}>{c.name}</Button>)}
            </ButtonGroup>
        </div>
    )
}

export default NotesFilter