import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        values: []
    },

    // CREATE -->
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.values.push(action.payload)
            },
            prepare: (text) => {
                return {
                    payload: { id: nanoid(), text, completed: false }
                }
            }
        },

        // UPDATE
        updateTodo: (state, action) => {
            const { id, text } = action.payload
            const isTodo = state.values.find((val) => val.id == id)
            if (isTodo) {
                isTodo.text = text
            }
        },

        // COMPLETED TODO
        toggleCompleted: (state, action) => {
            const todo = state.values.find((val) => val.id === action.payload)

            if (todo) {
                todo.completed = !todo.completed
            }
        },

        // DELETE
        deleteTodo: (state, action) => {
            state.values = state.values.filter((val) => val.id != action.payload)
        }
    }
})

export const { addTodo, updateTodo, toggleCompleted, deleteTodo } = todoSlice.actions

export default todoSlice.reducer