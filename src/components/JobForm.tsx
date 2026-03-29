import { useState, useEffect } from "react";
import type { Job } from "../types/Job"

// define a type of props
type JobFormProps = {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  editingJob?: Job;
  onUpdate?: (job: Job) => void;
  onCancel?: () => void;
};

const JobForm = ({ setJobs, editingJob, onUpdate, onCancel }: JobFormProps) => {
// initial value
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");
  const [jobLink, setJobLink] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (editingJob) {
      setTitle(editingJob.title);
      setCompany(editingJob.company);
      setStatus(editingJob.status);
      setJobLink(editingJob.jobLink || "");
      setSalary(editingJob.salary || "");
      setLocation(editingJob.location || "");
      setNotes(editingJob.notes || "");
      setContactPerson(editingJob.contactPerson || "");
    } else {
      setTitle("");
      setCompany("");
      setStatus("Applied");
      setJobLink("");
      setSalary("");
      setLocation("");
      setNotes("");
      setContactPerson("");
    }
  }, [editingJob]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const now = new Date().toISOString().split('T')[0];
    
    if (editingJob && onUpdate) {
      // Update existing job
      const updatedJob: Job = {
        ...editingJob,
        title,
        company,
        status,
        jobLink: jobLink || undefined,
        salary: salary || undefined,
        location: location || undefined,
        notes: notes || undefined,
        contactPerson: contactPerson || undefined,
        lastUpdated: now,
      };
      onUpdate(updatedJob);
    } else {
      // Create new job
      const newJob: Job = { 
        id: crypto.randomUUID(),
        title, 
        company, 
        status,
        dateApplied: now,
        lastUpdated: now,
        jobLink: jobLink || undefined,
        salary: salary || undefined,
        location: location || undefined,
        notes: notes || undefined,
        contactPerson: contactPerson || undefined,
      };
      setJobs(prev => [...prev, newJob]);
      // Reset the form field
      setTitle("");
      setCompany("");
      setStatus("Applied");
      setJobLink("");
      setSalary("");
      setLocation("");
      setNotes("");
      setContactPerson("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salary (optional)"
        value={salary}
        onChange={e => setSalary(e.target.value)}
      />
      <input
        type="url"
        placeholder="Job Link (optional)"
        value={jobLink}
        onChange={e => setJobLink(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact Person (optional)"
        value={contactPerson}
        onChange={e => setContactPerson(e.target.value)}
      />
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd", fontFamily: "inherit", minHeight: "80px" }}
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <button type="submit" style={{ flex: 1 }}>
          {editingJob ? "Update Job" : "Add Job"}
        </button>
        {editingJob && onCancel && (
          <button type="button" onClick={onCancel} style={{ backgroundColor: "#999", color: "white", border: "none", padding: "8px", borderRadius: "4px", cursor: "pointer" }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};


// Same export (no change)
export default JobForm;