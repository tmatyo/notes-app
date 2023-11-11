import Note from "./Note"
import AnnouncementIcon from '@mui/icons-material/Announcement';

const NotesList = ({notes}) => {

    return (
        <>
            {
                notes ? (
                    <div className="notes-list">
                        { notes.map(n => <Note note={n} key={n.id} />) }
                    </div>
                ) : (
                    <div className="empty-list">
                        <AnnouncementIcon />
                        <p>No notes yet :(</p>
                    </div>
                )
            }
        </>       
    )
}

export default NotesList