/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from '../models/ITodo';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://tsarjke-todo-server.ml' }),
  tagTypes: ['Todo', 'Total'],
  endpoints: (builder) => ({
    fetchTodos: builder.query<
    { todos: ITodo[]; total: number },
    { limit: number; currentPage: number }
    >({
      query: (data) => ({
        url: '/todos',
        params: {
          _limit: data.limit,
          _page: data.currentPage,
        },
      }),
      transformResponse(todos: ITodo[], meta) {
        return { todos, total: Number(meta?.response?.headers.get('x-total-count')) };
      },
      providesTags: () => ['Todo'],
    }),

    addTodo: builder.mutation<ITodo, ITodo>({
      query: (todoItem) => ({
        url: '/todos',
        method: 'POST',
        body: todoItem,
      }),
      invalidatesTags: ['Todo'],
    }),

    deleteTodo: builder.mutation<number, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      transformResponse() {
        return 200;
      },
      invalidatesTags: ['Todo'],
    }),

    changeCompleted: builder.mutation<number, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      transformResponse() {
        return 200;
      },
    }),
  }),
});
