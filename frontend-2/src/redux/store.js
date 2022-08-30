import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todosSlice'
const store = configureStore({
    reducer: {
        todoReducer:todoReducer
    }
})
export default store