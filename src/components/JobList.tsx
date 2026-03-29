import JobCard from "./JobCard";
import type { Job } from "../types/Job";

type JobListProps = {
  jobs: Job[];
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
};

const JobList = ({ jobs, onDelete, onEdit }: JobListProps) => {
  if (jobs.length === 0) {
    return <p style={{ textAlign: "center", color: "#999" }}>No jobs found.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
       <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} onDeleteClick={onDelete} />
      ))}
    </div>
  );
};

export default JobList;