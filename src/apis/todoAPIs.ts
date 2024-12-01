import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTodos = createAsyncThunk('todos/getTodos', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos'
  );
  return response.data;
});
