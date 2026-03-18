import type { Job } from "../types/Job";

type JobCardProps = {
  job: Job;
  onDelete: (id: string) => void;
};

const JobCard = ({ job, onDelete }: JobCardProps) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
      }}
    >
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>Status: {job.status}</p>
      <button
        style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
        onClick={() => onDelete(job.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default JobCard;