/* eslint-disable react/button-has-type */
import React from 'react';
import cl from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ children, type, onClick }) => (
  <button className={cl.btn} onClick={onClick} type={type || 'button'}>
    {children}
  </button>
);

Button.defaultProps = {
  onClick: undefined,
  type: 'button',
};

export default Button;
