import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    status:'idle',
    todo:[]
}

const todosSlice = createSlice({
    name:'todo',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodo.pending,(state,action) =>{
            state.status = 'PENDING';
        })
        builder.addCase(fetchTodo.fulfilled,(state,action) =>{
            state.status = 'SUCCESS';
            state.todo = action.payload
        })
        builder.addCase(fetchTodo.rejected,(state,action) =>{
            state.status = 'FAILURE';
        })
        

        builder.addCase(addTodo.pending,(state,action) =>{
            state.status = 'PENDING'
        })
        builder.addCase(addTodo.fulfilled,(state,action) =>{
            state.status = 'IDLE'
            state.todo.push(action.payload)
        })

        builder.addCase(updateTodo.fulfilled,(state,action) =>{
            state.status = 'SUCCESS';
            const { _id,author,title, status } = action.payload
            const existingPost = state.todo.find(post => post._id === _id)
            if (!existingPost) {
                return 
            }
            else {
                existingPost.title = title
                existingPost.author = author
                existingPost.status = status
            }
        })
        builder.addCase(deleteTodo.pending,(state,action) =>{
            state.status = 'PENDING'
        })
        builder.addCase(deleteTodo.fulfilled,(state,action) =>{
            state.status = 'SUCCESS'
            const {_id} = action.payload
            state.todo =  state.todo.filter(todo => todo._id !== _id)
        })
        builder.addCase(updateTodo.pending,(state,action) =>{
            state.status = 'PENDING';
        })
        builder.addCase(updateTodo.rejected,(state,action) =>{
            state.status = 'FAILURE';
        })

    }
})
export const fetchTodo = createAsyncThunk('fetchTodo', async ()=>{
    const res = await fetch('http://localhost:5000/work')
    const data = await res.json()
    return data
})

export const updateTodo = createAsyncThunk('updateTodo', async (payload)=>{
    const res = await fetch(`http://localhost:5000/work/${payload._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',   
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    return data
})
 
export const deleteTodo = createAsyncThunk('deleteTodo', async (payload)=>{
    const res = await fetch(`http://localhost:5000/work/${payload._id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',   
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    return data
})
export const addTodo = createAsyncThunk('addTodo', async (payload)=>{
    const res = await fetch(`http://localhost:5000/work`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',   
          },
          body: JSON.stringify(payload)
    })
    const data = await res.json()
    return data
})

export default todosSlice.reducer;