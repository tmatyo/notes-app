import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
    return await fetch("http://localhost:1234/notes?_expand=category")
    .then(r => r.json())
})

export const fetchCategories = createAsyncThunk("note/fetchCategories", async () => {
    return await fetch("http://localhost:1234/categories")
    .then(r => r.json())
})

// crud
export const createNote = createAsyncThunk("note/createNote", async ({title, categoryId, description}) => {
    return await fetch("http://localhost:1234/notes", {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({title, categoryId, description})
    })
    .then(r => r.json())
})

export const editNote = createAsyncThunk("note/editNote", async ({id, title, categoryId, description}) => {
    return await fetch("http://localhost:1234/notes/" + id, {
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify({ title, categoryId, description })
    })
    .then(r => r.json())
})

export const removeNote = createAsyncThunk("note/removeNote", async (id) => {
    return await fetch("http://localhost:1234/notes/" + id, {
        method: "DELETE"
      }).then(r => r.json())
})

// filter
export const filterBy = createAsyncThunk("note/filterBy", async (id) => {
    return await fetch("http://localhost:1234/notes?_expand=category&categoryId=" + id)
    .then(r => r.json())
})

const noteReset = {
    id: null,
    title: "",
    categoryId: "",
    description: ""
}

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        note: noteReset,
        edit: null,
        notes: [],
        categories: [],
        pending: false,
        error: ''
    },
    reducers: {
        setId: (state, action) => {
            console.log(action)
            state.note.id = action.payload
        },
        setTitle: (state, action) => {
            console.log(action)
            state.note.title = action.payload.substring(0, 50)
        },
        setCategoryId: (state, action) => {
            console.log(action)
            state.note.categoryId = action.payload
        },
        setDescription: (state, action) => {
            console.log(action)
            state.note.description = action.payload.substring(0, 256)
        },
        setEdit: (state, action) => {
            let noteToEdit = state.notes.filter(n => n.id === action.payload)[0]
            state.edit = noteToEdit.id
            state.note.title = noteToEdit.title
            state.note.categoryId = noteToEdit.categoryId
            state.note.description = noteToEdit.description
        }
        //getNote: (state, id) => state.notes.length > 0 ? state.notes.filter(n => n.id === id) : []
    },
    extraReducers: builder => {

        // fetch notes
        
        builder.addCase(fetchNotes.pending, (state) => {
            state.pending = true
        })
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.pending = false
            state.notes = action.payload
        })
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.pending = false
            state.error = action.payload
        })

        // fetch categories

        builder.addCase(fetchCategories.pending, (state) => {
            state.pending = true
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.pending = false
            state.categories = action.payload
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.pending = false
            state.error = action.payload
        })

        // create note

        builder.addCase(createNote.pending, (state) => {
            state.pending = true
        })
        builder.addCase(createNote.fulfilled, (state, action) => {
            state.pending = false
            state.note = noteReset
            state.notes = []
        })
        builder.addCase(createNote.rejected, (state, action) => {
            state.pending = false
            state.error = action.payload
        })

        // edit note

        builder.addCase(editNote.pending, (state) => {
            state.pending = true
        })
        builder.addCase(editNote.fulfilled, (state, action) => {
            state.pending = false
            state.note = noteReset
            state.notes = []
        })
        builder.addCase(editNote.rejected, (state, action) => {
            state.pending = false
            state.error = action.payload
        })

        // remove note

        builder.addCase(removeNote.pending, (state) => {
            state.pending = true
        })
        builder.addCase(removeNote.fulfilled, (state, action) => {
            state.pending = false
            state.notes = []
        })
        builder.addCase(removeNote.rejected, (state, action) => {
            state.pending = false
            state.error = action.payload
        })

        // filter by category

        builder.addCase(filterBy.pending, (state) => {
            state.pending = true
        })
        builder.addCase(filterBy.fulfilled, (state, action) => {
            state.pending = false
            state.notes = action.payload
        })
        builder.addCase(filterBy.rejected, (state, action) => {
            state.pending = false
            state.error = action.payload
        })
    }


})

export const {setId, setTitle, setCategoryId, setDescription, setEdit} = noteSlice.actions

export default noteSlice.reducer