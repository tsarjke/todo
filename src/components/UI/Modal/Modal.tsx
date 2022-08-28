import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { todoSlice } from '../../../store/reducers/todoSlice';
import cl from './Modal.module.css';

interface ModalProps {
  // visibility: boolean;
  // setVisibility: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isModalVisible } = useAppSelector((store) => store.todoReducer);
  const { setModalVisibility } = todoSlice.actions;
  const dispatch = useAppDispatch();

  const onKeyPressHandler = () => {};

  const onShadowClick = (value: boolean) => {
    dispatch(setModalVisibility(value));
  };

  return isModalVisible ? (
    <div
      className={cl.shadow}
      onClick={() => onShadowClick(false)}
      onKeyPress={onKeyPressHandler}
      role="button"
      tabIndex={-1}
    >
      <CSSTransition
        in={isModalVisible}
        timeout={100}
        classNames={{
          enter: cl.modalEnter,
          enterDone: cl.modalEnterActive,
          exit: cl.modalExit,
          exitActive: cl.modalExitActive,
        }}
      >
        <div
          className={cl.modal}
          onClick={(e) => e.stopPropagation()}
          onKeyPress={onKeyPressHandler}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
      </CSSTransition>
    </div>
  ) : null;
};

export default Modal;
