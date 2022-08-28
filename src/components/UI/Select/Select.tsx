import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IOpt } from '../../../models/IOpt';
import { todoSlice } from '../../../store/reducers/todoSlice';
import cl from './Select.module.css';

interface SelectProps {
  options: IOpt[];
  defaultValue: string;
}

const Select: React.FC<SelectProps> = ({ options, defaultValue }) => {
  const {
    sortAndFilter: { sortType },
  } = useAppSelector((store) => store.todoReducer);
  const { setSortValue } = todoSlice.actions;
  const dispatch = useAppDispatch();

  const onChange = (newSortValue: string) => {
    dispatch(setSortValue(newSortValue));
  };

  return (
    <select className={cl.select} value={sortType} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled>
        {defaultValue}
      </option>
      {options.map(({ optName, optValue }) => (
        <option key={optValue} value={optValue}>
          {optName}
        </option>
      ))}
    </select>
  );
};

export default Select;
