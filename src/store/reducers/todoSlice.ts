/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { ITodo, IsupportiveTodo } from '../../models/ITodo';

interface ITodoState {
  todos: ITodo[];
  pagination: { currentPage: number; limit: number; totalCount: number };
  error: string;
  isLoading: boolean;
  isModalVisible: boolean;
  sortAndFilter: {
    sortType: string;
    searchString: string;
  };
}

const initialState: ITodoState = {
  todos: [],
  pagination: { currentPage: 1, limit: 5, totalCount: 0 },
  error: '',
  isLoading: false,
  isModalVisible: false,
  sortAndFilter: {
    sortType: '',
    searchString: '',
  },
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos(state, action: PayloadAction<{ todos: ITodo[]; total: number } | undefined>) {
      if (action.payload?.todos.length) {
        state.isLoading = false;
        state.error = '';
        const supportiveTodo = [...current(state.todos), ...action.payload.todos].reduce(
          (acc: IsupportiveTodo, todo: ITodo) => {
            if (!acc.ids.includes(todo.id)) {
              acc.ids.push(todo.id);
              acc.items.push(todo);
            }
            return acc;
          },
          { ids: [], items: [] },
        );
        state.todos = supportiveTodo.items;
        state.pagination.totalCount = action.payload.total;
      }
    },
    deleteNote(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo: ITodo) => todo.id !== action.payload);
      state.pagination.totalCount -= 1;
    },
    changeCompleted(state, action: PayloadAction<ITodo>) {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.completed = !todo.completed;
        }
      });
    },
    changePage(state, action: PayloadAction<number>) {
      state.pagination.currentPage += action.payload;
    },
    setModalVisibility(state, action: PayloadAction<boolean>) {
      state.isModalVisible = action.payload;
    },
    setSortValue(state, action: PayloadAction<string>) {
      state.sortAndFilter.sortType = action.payload;
    },
    setSearchString(state, action: PayloadAction<string>) {
      state.sortAndFilter.searchString = action.payload;
    },
  },
});

export default todoSlice.reducer;
