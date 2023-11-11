
export default function Note({note}) {

    return (
        <div className="note card">
            <h3 className="note-title">{ note.title }</h3>
            <p className="note-category">{ note.category.name }</p>
            <p className="note-description">{ note.description }</p>
        </div>
    )
}