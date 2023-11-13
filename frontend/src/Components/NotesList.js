import Note from "./Note"
import AnnouncementIcon from '@mui/icons-material/Announcement'
import NotesFilter from './NotesFilter'

const NotesList = ({notes, categories }) => {

    return (
        <>
            {
                notes ? (
                    <>
                        <NotesFilter categories={categories}  notesCount={notes.length}/>
                        <div className="notes-list">
                            { notes && notes.map(n => <Note note={n} key={n.id} />) }
                        </div>
                    </>
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