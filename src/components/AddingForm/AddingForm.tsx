import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITodo } from '../../models/ITodo';
import { todosApi } from '../../services/todoService';
import { todoSlice } from '../../store/reducers/todoSlice';
import Button from '../UI/Button/Button';
import Input from '../UI/TextInput/TextInput';

const AddingForm: React.FC = () => {
  const {
    pagination: { currentPage, limit, totalCount },
  } = useAppSelector((store) => store.todoReducer);
  const { setModalVisibility, changePage } = todoSlice.actions;
  const [createInput, setCreateInput] = useState<string>('');
  const dispatch = useAppDispatch();

  const [addTodoItem] = todosApi.useAddTodoMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (createInput) {
      const response = await addTodoItem({
        title: createInput,
        completed: false,
        date: new Date().getTime(),
      } as ITodo);
      if ('data' in response && response.data.title === createInput) {
        const rawPages = totalCount / limit;
        if (rawPages === currentPage) {
          dispatch(changePage(1));
        }
      }
      setCreateInput('');
      dispatch(setModalVisibility(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={createInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCreateInput(event.target.value)}
        placeholder="Type note here"
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default AddingForm;
