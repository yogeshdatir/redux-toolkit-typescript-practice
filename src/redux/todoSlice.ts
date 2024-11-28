import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TTodo } from '../types/todoTypes';

export type TInitialState = {
  todos: TTodo[];
};

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state: TInitialState, action: PayloadAction<TTodo>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.todos.unshift(action.payload);
    },
    removeTodo: (state: TInitialState, action) => {
      const index = state.todos.findIndex(
        (todo) => todo?.id === action.payload
      );
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
