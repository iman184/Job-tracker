import type { Job } from "../types/Job";

type JobCardProps = {
  job: Job;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
  onDeleteClick?: (id: string) => void;
};

const JobCard = ({ job, onDelete, onEdit, onDeleteClick }: JobCardProps) => {
  // Status-based styling
  const getStatusColor = (status: Job["status"]) => {
    switch (status) {
      case "Offer":
        return { border: "2px solid #00aa00", backgroundColor: "#f0fff0" };
      case "Interview":
        return { border: "2px solid #ff9900", backgroundColor: "#fffaf0" };
      case "Rejected":
        return { border: "2px solid #cc0000", backgroundColor: "#fff5f5" };
      case "Applied":
      default:
        return { border: "2px solid #0066cc", backgroundColor: "#f0f8ff" };
    }
  };

  const colors = getStatusColor(job.status);

  return (
    <div style={{
      padding: "15px",
      marginBottom: "12px",
      borderRadius: "8px",
      ...colors,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 5px 0" }}>{job.title}</h3>
          <p style={{ margin: "5px 0", fontSize: "0.95em" }}>
            <strong>{job.company}</strong>
            {job.location && <span> • {job.location}</span>}
          </p>
          <p style={{ margin: "5px 0", fontSize: "0.9em", color: "#666" }}>
            Status: <span style={{ 
              padding: "2px 8px", 
              borderRadius: "4px", 
              backgroundColor: colors.border,
              color: "white",
              fontWeight: "bold"
            }}>{job.status}</span>
          </p>
          
          <div style={{ fontSize: "0.85em", color: "#777", marginTop: "8px" }}>
            <p style={{ margin: "3px 0" }}>Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
            {job.lastUpdated && (
              <p style={{ margin: "3px 0" }}>Updated: {new Date(job.lastUpdated).toLocaleDateString()}</p>
            )}
          </div>

          {(job.salary || job.contactPerson || job.jobLink || job.notes) && (
            <div style={{ fontSize: "0.9em", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              {job.salary && <p style={{ margin: "3px 0" }}><strong>Salary:</strong> {job.salary}</p>}
              {job.contactPerson && <p style={{ margin: "3px 0" }}><strong>Contact:</strong> {job.contactPerson}</p>}
              {job.notes && <p style={{ margin: "3px 0", fontStyle: "italic" }}><strong>Notes:</strong> {job.notes}</p>}
              {job.jobLink && (
                <p style={{ margin: "3px 0" }}>
                  <strong>Link:</strong> <a href={job.jobLink} target="_blank" rel="noopener noreferrer" style={{ color: "#0066cc" }}>View Job</a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <button
          style={{ 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            padding: "6px 12px", 
            cursor: "pointer", 
            borderRadius: "4px",
            fontSize: "0.9em"
          }}
          onClick={() => onEdit(job)}
        >
          Edit
        </button>
        <button
          style={{ 
            backgroundColor: "#cc0000", 
            color: "white", 
            border: "none", 
            padding: "6px 12px", 
            cursor: "pointer", 
            borderRadius: "4px",
            fontSize: "0.9em"
          }}
          onClick={() => onDeleteClick ? onDeleteClick(job.id) : onDelete(job.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;