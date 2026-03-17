import { useState } from "react";
import type { Job } from "../types/Job"

// define a type of props
type JobFormProps = {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

const JobForm = ({ setJobs }: JobFormProps) => {
// initial value
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      
    const newJob: Job = { title, company, status };
    setJobs(prev => [...prev, newJob]);
   // Reset the form field
    setTitle("");
    setCompany("");
    setStatus("Applied");
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={e => setCompany(e.target.value)}
        required
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value as Job["status"])}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>
      <button type="submit">Add Job</button>

    </form>
  );
};


// Same export (no change)
export default JobForm;