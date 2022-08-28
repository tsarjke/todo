import { ITodo } from '../models/ITodo';

const sortTodos = (type: string, todos: ITodo[]) => {
  switch (type) {
    case 'finish':
      return todos.filter((todoItem) => todoItem.completed);
    case 'progress':
      return todos.filter((todoItem) => !todoItem.completed);
    case 'asc':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));
    case 'desc':
      return [...todos].sort((a, b) => b.title.localeCompare(a.title));
    case 'date asc':
      return [...todos].sort((a, b) => a.date - b.date);
    case 'date desc':
      return [...todos].sort((a, b) => b.date - a.date);
    default:
      return todos;
  }
};

export default sortTodos;
