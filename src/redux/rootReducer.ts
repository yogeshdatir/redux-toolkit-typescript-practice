import todoSlice from './todoSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  todos: todoSlice,
});

export default rootReducer;
