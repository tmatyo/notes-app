import { ButtonGroup, Button } from "@mui/material"
import { useDispatch } from "react-redux"
import { setEdit, removeNote } from '../Provider/noteSlice'

const Note = ({note}) => {

    const dispatch = useDispatch()

    return (
        <div className="note card">
            <h3 className="note-title">{ note.title }</h3>
            <p className="note-category">{ note.category.name }</p>
            <p className="note-description">{ note.description }</p>
            <hr className="note-button-divider"/>
            <ButtonGroup size="small" variant="text" aria-label="text small button group" className="note-button-group">
                <Button className="note-button note-edit-button" onClick={() => dispatch(setEdit(note.id))}>Edit</Button>
                <Button className="note-button note-remove-button" onClick={() => dispatch(removeNote(note.id))}>Remove</Button>
            </ButtonGroup>
        </div>
    )
}

export default Note