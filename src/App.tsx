import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import AddingForm from './components/AddingForm/AddingForm';
import SearchPanel from './components/SearchPanel/SearchPanel';
import TodoList from './components/TodoList/TodoList';
import Button from './components/UI/Button/Button';
import Modal from './components/UI/Modal/Modal';
import { useAppDispatch } from './hooks/redux';
import { todoSlice } from './store/reducers/todoSlice';
import './styles/styles.css';

const App: React.FC = () => {
  const { setModalVisibility } = todoSlice.actions;
  const dispatch = useAppDispatch();

  const onAddBtnClick = (value: boolean) => {
    dispatch(setModalVisibility(value));
  };

  return (
    <div className="app">
      <TransitionGroup>
        <Modal>
          <AddingForm />
        </Modal>
      </TransitionGroup>
      <div className="options">
        <SearchPanel />
        <Button onClick={() => onAddBtnClick(true)}>Add todo note</Button>
      </div>
      <TodoList />
    </div>
  );
};

export default App;
