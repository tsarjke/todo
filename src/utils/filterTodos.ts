import { ITodo } from '../models/ITodo';

const filterTodos = (query: string, todos: ITodo[]) =>
  todos.filter((todoItem) => todoItem.title.toLowerCase().includes(query.toLowerCase()));

export default filterTodos;
