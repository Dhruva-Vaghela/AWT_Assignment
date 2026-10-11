// Reusable search box + dropdown filter. Fully controlled via props.
function SearchFilter({ searchValue, onSearchChange, placeholder, filterValue, onFilterChange, filterOptions, filterLabel }) {
  return (
    <div className="search-filter">
      <input
        type="text"
        className="input search-input"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {filterOptions && (
        <select className="input" value={filterValue} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="All">{filterLabel}</option>
          {filterOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default SearchFilter;
