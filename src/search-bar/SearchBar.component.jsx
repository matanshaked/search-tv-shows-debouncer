const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const click = (event) => {
    setSearchTerm(event.target.value);
  };
  return <input type="text" value={searchTerm} onChange={click} />;
};

export default SearchBar;
