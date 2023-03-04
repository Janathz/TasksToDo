import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './SingleTodo.css';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const onClickDoneHandler = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const onClickDeleteHandler = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onSumbitEditHandler = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='todo__single'
      onSubmit={(e) => onSumbitEditHandler(e, todo.id)}
    >
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className='todo__single--text'
        />
      ) : todo.isDone ? (
        <s className='todo__single--text'>{todo.todo}</s>
      ) : (
        <span className='todo__single--text'>{todo.todo}</span>
      )}
      <div>
        <span
          className='icon'
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className='icon' onClick={() => onClickDeleteHandler(todo.id)}>
          <AiFillDelete />
        </span>
        <span className='icon' onClick={() => onClickDoneHandler(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};
export default SingleTodo;
