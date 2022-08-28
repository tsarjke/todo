import React, { useEffect, useMemo, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cl from './TodoList.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import TodoItem from '../TodoItem/TodoItem';
import { todosApi } from '../../services/todoService';
import { todoSlice } from '../../store/reducers/todoSlice';
import useSortAndFilter from '../../hooks/sortAndFilter';

const TodoList: React.FC = () => {
  const { addTodos, changePage } = todoSlice.actions;
  const dispatch = useAppDispatch();
  const {
    todos,
    pagination: { currentPage, limit, totalCount },
    sortAndFilter: { searchString, sortType },
  } = useAppSelector((store) => store.todoReducer);

  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<null | IntersectionObserver>(null);
  const totalPages = useMemo<number>(() => Math.ceil(totalCount / limit), [totalCount, limit]);

  const { data, isLoading, error } = todosApi.useFetchTodosQuery({ currentPage, limit });

  useEffect(() => {
    dispatch(addTodos(data));
  }, [data]);

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    const callback = (entries?: IntersectionObserverEntry[]) => {
      if (entries && entries[0].isIntersecting && currentPage < totalPages) {
        dispatch(changePage(1));
      }
    };

    observer.current = new IntersectionObserver(callback);
    if (!lastElement.current) return;
    observer.current.observe(lastElement.current);
  }, [isLoading, todos.length, totalPages]);

  const sortedTodos = useSortAndFilter(searchString, sortType, todos);

  if (error && 'error' in error) {
    return <h4 className={cl.info}>{error.error}</h4>;
  }

  if (!sortedTodos.length) {
    if (isLoading) {
      return <h4 className={cl.info}>Loading...</h4>;
    }
    return <h4 className={cl.info}>Notes not found!</h4>;
  }

  return (
    <>
      <ul className={cl.todoList}>
        <TransitionGroup component={null}>
          {sortedTodos.map((el, index) => (
            <CSSTransition
              key={el.id}
              timeout={{
                exit: 800,
              }}
              classNames={{
                enter: cl.itemEnter,
                enterDone: cl.itemEnterActive,
                exit: cl.itemExit,
                exitActive: cl.itemExitActive,
              }}
            >
              <TodoItem data={el} index={index} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
      <div ref={lastElement} />
    </>
  );
};

export default TodoList;
