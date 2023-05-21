import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { VscDebugRestart } from 'react-icons/vsc'

const SearchForm = ({ onSearch, onReset }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Ingrese un nombre de usuario"
          value={searchTerm}
          onChange={handleInputChange}
          className="py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md"
        >
          <AiOutlineSearch/>
        </button>
              <button
        type="button"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md ml-2"
        onClick={handleReset}
      >
        <VscDebugRestart/>
      </button>
      </div>
    </form>
  );
};

export default SearchForm;

