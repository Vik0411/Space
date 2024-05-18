const SearchButton = ({ isDisabled, onClick }) => (
  <button
    className="search-button"
    type="button"
    disabled={isDisabled}
    onClick={onClick}
  >
    Search
  </button>
);

export default SearchButton;
