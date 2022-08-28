import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { todoSlice } from '../../store/reducers/todoSlice';
import Select from '../UI/Select/Select';
import TextInput from '../UI/TextInput/TextInput';
import cl from './SearchPanel.module.css';

const selectOptions = [
  { optName: 'Finished', optValue: 'finish' },
  { optName: 'In progress', optValue: 'progress' },
  { optName: 'A-z', optValue: 'asc' },
  { optName: 'z-A', optValue: 'desc' },
  { optName: 'Date ↑', optValue: 'date asc' },
  { optName: 'Date ↓', optValue: 'date desc' },
  { optName: 'All', optValue: 'all' },
];

const SearchPanel = () => {
  const { setSearchString } = todoSlice.actions;
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState<string>('');
  useEffect(() => {
    dispatch(setSearchString(searchInput));
  }, [searchInput]);

  return (
    <div className={cl.searchPanel}>
      <TextInput
        placeholder="Type to search..."
        value={searchInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(event.target.value)}
      />
      <Select defaultValue="Sort by" options={selectOptions} />
    </div>
  );
};

export default SearchPanel;
