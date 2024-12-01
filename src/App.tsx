import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { addTodo, removeTodo } from './redux/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { TTodo } from './types/todoTypes';
import { getTodos } from './apis/todoAPIs';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';

function App() {
  const { todos, isLoading, error } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const [todo, setTodo] = useState<TTodo>(null);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

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

  if (isLoading) return <div>...loading</div>;

  if (error) return <div>{error}</div>;

  return (
    <>
      <input type="text" value={todo?.title || ''} onChange={handleChange} />
      <button onClick={handleSubmit}>Add Todo</button>
      {!!todos?.length &&
        todos?.map((todo: TTodo) => (
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
