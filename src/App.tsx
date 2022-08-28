import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import AddingForm from './components/AddingForm/AddingForm';
import Footer from './components/Footer/Footer';
import SearchPanel from './components/SearchPanel/SearchPanel';
import TodoList from './components/TodoList/TodoList';
import Button from './components/UI/Button/Button';
import Contact from './components/UI/Contact/Contact';
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
      <TransitionGroup component={null}>
        <Modal>
          <AddingForm />
        </Modal>
      </TransitionGroup>
      <div className="options">
        <SearchPanel />
        <Button onClick={() => onAddBtnClick(true)}>Add todo note</Button>
      </div>
      <TodoList />
      <Footer text="To see other projects or just chat follow the links">
        <Contact />
      </Footer>
    </div>
  );
};

export default App;
