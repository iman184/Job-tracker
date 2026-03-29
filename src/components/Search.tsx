type SearchProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const Search = ({ searchTerm, onSearchChange }: SearchProps) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <input
        type="text"
        placeholder="Search by title or company..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          fontSize: "1em",
          boxSizing: "border-box"
        }}
      />
    </div>
  );
};

export default Search;
