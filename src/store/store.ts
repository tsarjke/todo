import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosApi } from '../services/todoService';
import todoReducer from './reducers/todoSlice';

const rootReducer = combineReducers({
  todoReducer,
  [todosApi.reducerPath]: todosApi.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
