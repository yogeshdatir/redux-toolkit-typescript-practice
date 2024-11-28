import { ChangeEvent, useState } from 'react';
import './App.css';
import { addTodo, removeTodo } from './redux/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { TTodo } from './types/todoTypes';

function App() {
  const { todos } = useSelector((state: RootState) => state.todos) || {};

  const dispatch = useDispatch();

  const [todo, setTodo] = useState<TTodo>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({ id: uuidv4(), title: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addTodo(todo));
    setTodo(null);
  };

  const handleRemove = (id: string | undefined) => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      <input type="text" value={todo?.title || ''} onChange={handleChange} />
      <button onClick={handleSubmit}>Add Todo</button>
      {todos?.map((todo: TTodo) => (
        <div
          key={todo?.id}
          style={{ display: 'flex', gap: '1rem', padding: '1rem' }}
        >
          <p>{todo?.title}</p>
          <button onClick={() => handleRemove(todo?.id)}>X</button>
        </div>
      ))}
    </>
  );
}

export default App;
