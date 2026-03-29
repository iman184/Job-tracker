import type { Job } from "../types/Job";

type FilterSortProps = {
  selectedStatuses: Set<Job["status"]>;
  onStatusChange: (status: Job["status"], isChecked: boolean) => void;
  sortBy: "status" | "title" | "date";
  onSortChange: (sort: "status" | "title" | "date") => void;
};

const STATUSES: Job["status"][] = ["Applied", "Interview", "Rejected", "Offer"];

const FilterSort = ({ selectedStatuses, onStatusChange, sortBy, onSortChange }: FilterSortProps) => {
  return (
    <div className="filter-bar">
      {STATUSES.map(status => (
        <label key={status}>
          <input
            type="checkbox"
            checked={selectedStatuses.has(status)}
            onChange={e => onStatusChange(status, e.target.checked)}
          />
          {status}
        </label>
      ))}

      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value as "status" | "title" | "date")}
        style={{ marginLeft: "auto" }}
      >
        <option value="date">Date (Newest)</option>
        <option value="title">Title (A–Z)</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
};

export default FilterSort;