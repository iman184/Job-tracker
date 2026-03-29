import JobCard from "./JobCard";
import type { Job } from "../types/Job";

type JobListProps = {
  jobs: Job[];
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
};

const JobList = ({ jobs, onDelete, onEdit }: JobListProps) => {
  if (jobs.length === 0) {
    return <div className="empty-col">No applications yet</div>;
  }

  return (
    <>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} onDeleteClick={onDelete} />
      ))}
    </>
  );
};

export default JobList;