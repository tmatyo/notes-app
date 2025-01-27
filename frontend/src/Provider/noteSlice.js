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
        body: JSON.stringify({title, categoryId, description, dateAdded: new Date().toISOString()})
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

// search
export const search = createAsyncThunk("note/search", async (query) => {
    return await fetch("http://localhost:1234/notes?_expand=category&q=" + query)
    .then(r => r.json())
})

const noteReset = {
    id: null,
    title: "",
    categoryId: "",
    description: "",
    dateAdded: ""
}

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        note: noteReset,
        edit: null,
        notes: [],
        categories: [],
        pending: false,
        error: '',
        sort: 'asc'
    },
    reducers: {
        setId: (state, action) => {
            state.note.id = action.payload
        },
        setTitle: (state, action) => {
            state.note.title = action.payload.substring(0, 50)
        },
        setCategoryId: (state, action) => {
            state.note.categoryId = action.payload
        },
        setDescription: (state, action) => {
            state.note.description = action.payload.substring(0, 256)
        },
        resetNote: (state, action) => {
            state.note = noteReset
            state.edit = null
        },
        setEdit: (state, action) => {
            let noteToEdit = state.notes.filter(n => n.id === action.payload)[0]
            state.edit = noteToEdit.id
            state.note.title = noteToEdit.title
            state.note.categoryId = noteToEdit.categoryId
            state.note.description = noteToEdit.description
        },
        setSort: (state, action) => {
            state.sort = action.payload
            state.notes = []
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
            state.notes = state.sort === 'asc' ? action.payload.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)) : action.payload.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
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
            state.edit = null
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

        // search

        builder.addCase(search.pending, (state) => {
            state.pending = true
        })
        builder.addCase(search.fulfilled, (state, action) => {
            state.pending = false
            state.notes = action.payload
        })
        builder.addCase(search.rejected, (state, action) => {
            state.pending = false
            state.error = action.payload
        })
    }


})

export const {setId, setTitle, setCategoryId, setDescription, resetNote, setEdit, setSort} = noteSlice.actions

export default noteSlice.reducer