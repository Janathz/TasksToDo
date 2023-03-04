import { useRef } from 'react';
import './InputFeild.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodoHandler: (e: React.FormEvent) => void;
}
// onst InputFeild = ({ todo, setTodo }: Props) => {
const InputFeild: React.FC<Props> = ({
  todo,
  setTodo,
  addTodoHandler,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='input'
      onSubmit={(e) => {
        addTodoHandler(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type='input'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Enter a task...'
        className='input__box'
      />
      <button className='input__submit' type='submit'>
        Go
      </button>
    </form>
  );
};
export default InputFeild;
