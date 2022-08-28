import { useMemo } from 'react';
import sortTodos from '../utils/sortTodos';
import filterTodos from '../utils/filterTodos';
import { ITodo } from '../models/ITodo';

const useSortAndFilter = (searchString: string, sortType: string, todos: ITodo[]) => {
  const sortedTodos = useMemo(() => {
    if (todos.length) {
      return filterTodos(searchString, sortTodos(sortType, todos));
    }
    return [];
  }, [searchString, sortType, todos]);

  return sortedTodos;
};

export default useSortAndFilter;
