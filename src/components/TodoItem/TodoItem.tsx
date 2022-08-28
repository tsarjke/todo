import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITodo } from '../../models/ITodo';
import { todosApi } from '../../services/todoService';
import { todoSlice } from '../../store/reducers/todoSlice';
import Button from '../UI/Button/Button';
import cl from './TodoItem.module.css';

interface TodoItemProps {
  data: ITodo;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ data, index }) => {
  const { changeCompleted, changePage, deleteNote } = todoSlice.actions;
  const dispatch = useAppDispatch();

  const [deleteTodoItem] = todosApi.useDeleteTodoMutation();
  const [chengeItemCompleted] = todosApi.useChangeCompletedMutation();

  const {
    pagination: { limit, totalCount },
  } = useAppSelector((store) => store.todoReducer);

  const changeHandler = async (todo: ITodo) => {
    const response = await chengeItemCompleted({ ...todo, completed: !todo.completed });
    if ('data' in response && response.data === 200) {
      dispatch(changeCompleted(todo));
    }
  };

  const onKeyPressHandler = (event: React.KeyboardEvent, todo: ITodo) => {
    if (event.key === 'Enter') dispatch(changeCompleted(todo));
  };

  const deleteTodoHandler = async (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    const response = await deleteTodoItem(id);
    if ('data' in response && response.data === 200) {
      dispatch(deleteNote(id));
      if (totalCount % limit === 1) {
        dispatch(changePage(-1));
      }
    }
  };

  return (
    <li>
      <div
        className={data.completed ? [cl.todoItem, cl.completed].join(' ') : cl.todoItem}
        onClick={() => changeHandler(data)}
        onKeyPress={(event) => onKeyPressHandler(event, data)}
        role="button"
        tabIndex={0}
      >
        <h4>{`${index + 1}. ${data.title}`}</h4>
        <Button
          onClick={(event: React.MouseEvent) => deleteTodoHandler(event, data.id)}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
