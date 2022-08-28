import React from 'react';
import cl from './TextInput.module.css';

interface InputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  innerRef?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
}

const TextInput: React.FC<InputProps> = ({
  value, onChange, innerRef, placeholder,
}) => (
  <input
    className={cl.textInput}
    ref={innerRef}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

TextInput.defaultProps = {
  value: undefined,
  onChange: () => null,
  innerRef: undefined,
  placeholder: '',
};

export default TextInput;
