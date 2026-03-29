import type { Job } from "../types/Job";

type FilterSortProps = {
  selectedStatuses: Set<Job["status"]>;
  onStatusChange: (status: Job["status"], isChecked: boolean) => void;
  sortBy: "status" | "title" | "date";
  onSortChange: (sort: "status" | "title" | "date") => void;
};

const FilterSort = ({ selectedStatuses, onStatusChange, sortBy, onSortChange }: FilterSortProps) => {
  const statuses: Job["status"][] = ["Applied", "Interview", "Rejected", "Offer"];

  return (
    <div style={{ 
      marginBottom: "20px", 
      padding: "15px", 
      backgroundColor: "#f5f5f5", 
      borderRadius: "6px" 
    }}>
      <div>
        <h4 style={{ marginTop: 0 }}>Filter by Status</h4>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          {statuses.map(status => (
            <label key={status} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="checkbox"
                checked={selectedStatuses.has(status)}
                onChange={(e) => onStatusChange(status, e.target.checked)}
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <h4 style={{ marginTop: 0 }}>Sort by</h4>
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value as "status" | "title" | "date")}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
        >
          <option value="date">Date Applied (Newest)</option>
          <option value="title">Title (A-Z)</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
