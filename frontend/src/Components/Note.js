import { ButtonGroup, Button } from "@mui/material"


export default function Note({note, edit, remove}) {

    return (
        <div className="note card">
            <h3 className="note-title">{ note.title }</h3>
            <p className="note-category">{ note.category.name }</p>
            <p className="note-description">{ note.description }</p>
            <hr className="note-button-divider"/>
            <ButtonGroup size="small" variant="text" aria-label="text small button group" className="note-button-group">
                <Button className="note-button note-edit-button" onClick={() => edit(note.id)}>Edit</Button>
                <Button className="note-button note-remove-button" onClick={() => remove(note.id)}>Remove</Button>
            </ButtonGroup>
        </div>
    )
}