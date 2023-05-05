import PropTypes from 'prop-types';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { useState } from 'react';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-toastify';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSearch = e => {
    setValue(e.currentTarget.value);
  };

  const handleSumbmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.error('Type something');
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSumbmit}>
        <Button type="submit">
          <GrSearch size="26" />
        </Button>

        <Input
          onChange={handleSearch}
          value={value}
          type="text"
          name="search"
          autoСomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
