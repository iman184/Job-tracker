import { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import type { Job } from "./types/Job";

const App = () => {
  // Initialize state from localStorage
  const [jobs, setJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem("jobs");
    console.log("Loaded jobs from localStorage:", stored);
    return stored ? JSON.parse(stored) : [];
  });

  // Save jobs whenever they change
  useEffect(() => {
    console.log("Saving jobs to localStorage:", jobs);
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Delete job by id
  const handleDelete = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>Job Tracker</h1>
      <JobForm setJobs={setJobs} />
      <JobList jobs={jobs} onDelete={handleDelete} />
    </div>
  );
};

export default App;