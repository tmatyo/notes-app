import Note from "./Note"
import AnnouncementIcon from '@mui/icons-material/Announcement'
import NotesFilter from './NotesFilter'

const NotesList = ({notes, edit, remove, categoriesList, filterByCategory}) => {

    return (
        <>
            {
                notes ? (
                    <>
                        <NotesFilter categoriesList={categoriesList} filterByCategory={filterByCategory} notesCount={notes.length}/>
                        <div className="notes-list">
                            { notes.map(n => <Note note={n} edit={edit} remove={remove} key={n.id} />) }
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