import { ButtonGroup, Button } from "@mui/material"

const NotesFilter = ({categoriesList, filterByCategory, notesCount}) => {

    return (
        <div className="notes-filter card">
            <span>Notes count: {notesCount}</span>
            <ButtonGroup className="notes-filter-buttons" variant="outlined" size="small" aria-label="small button group">
                <Button key={0} onClick={() => filterByCategory(0)} >Reset</Button>
            </ButtonGroup>
            <ButtonGroup className="notes-filter-buttons" variant="outlined" size="small" aria-label="small button group">                
                { categoriesList.map(c => <Button key={c.id} onClick={() => filterByCategory(c.id)}>{c.name}</Button>)}
            </ButtonGroup>
        </div>
    )
}

export default NotesFilter