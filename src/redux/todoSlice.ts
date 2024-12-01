import { createSlice } from '@reduxjs/toolkit';
import { TTodo } from '../types/todoTypes';
import { getTodos } from '../apis/todoAPIs';

export type TState = {
  todos: TTodo[];
  isLoading: boolean;
  error: string;
};

const initialState: TState = {
  todos: [],
  isLoading: false,
  error: '',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.todos.unshift(action.payload);
    },
    removeTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo?.id === action.payload
      );
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.todos = [];
        state.error = action.error.message || 'Something went wrong...';
      });
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
