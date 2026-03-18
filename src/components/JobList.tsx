import JobCard from "./JobCard";
import type { Job } from "../types/Job";

type JobListProps = {
  jobs: Job[];
  onDelete: (id: string) => void;
};

const JobList = ({ jobs, onDelete }: JobListProps) => {
  if (jobs.length === 0) {
    return <p>No jobs added yet.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
       <JobCard key={job.id} job={job} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default JobList;