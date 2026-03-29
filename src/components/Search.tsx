type SearchProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const Search = ({ searchTerm, onSearchChange }: SearchProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or company..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Search;