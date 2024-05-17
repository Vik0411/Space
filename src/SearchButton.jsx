const SearchButton = ({ isDisabled, onClick }) => (
  <button
    className="button"
    type="button"
    disabled={isDisabled}
    onClick={onClick}
  >
    Search
  </button>
);

export default SearchButton;
