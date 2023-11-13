import { ButtonGroup, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { fetchNotes, filterBy, search, setSort } from "../Provider/noteSlice"
import { FormControl, TextField  } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const NotesFilter = ({categories, notesCount}) => {

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
            <ButtonGroup 
            className="notes-filter-buttons" 
            variant="outlined" 
            size="small" 
            aria-label="small button group">
                <Button key={0} onClick={() => dispatch(fetchNotes())} >Reset</Button>
            </ButtonGroup>

            <ButtonGroup 
            className="notes-filter-buttons" 
            variant="outlined" 
            size="small" 
            aria-label="small button group">                
                { categories && categories.map(c => <Button key={c.id} onClick={() => dispatch(filterBy(c.id))}>{c.name}</Button>)}
            </ButtonGroup>

            <ButtonGroup 
            className="notes-filter-buttons" 
            variant="outlined" 
            size="small" 
            aria-label="small button group">                
                <Button onClick={() => dispatch(setSort('asc'))} > <ArrowDropUpIcon /> <CalendarMonthIcon /></Button>
                <Button onClick={() => dispatch(setSort('desc'))} > <ArrowDropDownIcon /> <CalendarMonthIcon /></Button>
            </ButtonGroup>
        </div>
        </>
    )
}

export default NotesFilter