import  { useState } from "react";
import JobForm from "./components/JobForm";
import type { Job } from "./types/Job"

const App = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Log jobs whenever they change
  console.log("Jobs state:", jobs);

  return (
    <div>
      <h1>Job Tracker</h1>
      <JobForm setJobs={setJobs} />
    </div>
  );
};

export default App;