import { useState, useEffect } from "react";
import type { Job } from "../types/Job";

type JobFormProps = {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  editingJob?: Job;
  onUpdate?: (job: Job) => void;
  onCancel?: () => void;
};

const JobForm = ({ setJobs, editingJob, onUpdate, onCancel }: JobFormProps) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");
  const [jobLink, setJobLink] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  useEffect(() => {
    if (editingJob && editingJob.id) {
      setTitle(editingJob.title);
      setCompany(editingJob.company);
      setStatus(editingJob.status);
      setJobLink(editingJob.jobLink || "");
      setSalary(editingJob.salary || "");
      setLocation(editingJob.location || "");
      setNotes(editingJob.notes || "");
      setContactPerson(editingJob.contactPerson || "");
    } else if (editingJob && !editingJob.id) {
      // pre-filled status from "Add card" button
      setStatus(editingJob.status);
      setTitle(""); setCompany(""); setJobLink(""); setSalary(""); setLocation(""); setNotes(""); setContactPerson("");
    } else {
      setTitle(""); setCompany(""); setStatus("Applied"); setJobLink(""); setSalary(""); setLocation(""); setNotes(""); setContactPerson("");
    }
  }, [editingJob]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date().toISOString().split("T")[0];

    if (editingJob && editingJob.id && onUpdate) {
      onUpdate({ ...editingJob, title, company, status, jobLink: jobLink || undefined, salary: salary || undefined, location: location || undefined, notes: notes || undefined, contactPerson: contactPerson || undefined, lastUpdated: now });
    } else {
      setJobs(prev => [...prev, { id: crypto.randomUUID(), title, company, status, dateApplied: now, lastUpdated: now, jobLink: jobLink || undefined, salary: salary || undefined, location: location || undefined, notes: notes || undefined, contactPerson: contactPerson || undefined }]);
      setTitle(""); setCompany(""); setStatus("Applied"); setJobLink(""); setSalary(""); setLocation(""); setNotes(""); setContactPerson("");
      onCancel?.();
    }
  };

  const isEditing = !!(editingJob && editingJob.id);

  return (
    <>
      {/* modal header */}
      <div className="modal-head">
        <div className="modal-title-text">{isEditing ? "Edit application" : "Add application"}</div>
        {onCancel && <button className="modal-x" type="button" onClick={onCancel}>✕</button>}
      </div>

      {/* modal body = form fields */}
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="fg-row">
            <div className="fg">
              <label>Role *</label>
              <input type="text" placeholder="e.g. Product Designer" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="fg">
              <label>Company *</label>
              <input type="text" placeholder="e.g. Notion" value={company} onChange={e => setCompany(e.target.value)} required />
            </div>
          </div>

          <div className="fg-row">
            <div className="fg">
              <label>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as Job["status"])}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="fg">
              <label>Location</label>
              <input type="text" placeholder="Remote, NYC..." value={location} onChange={e => setLocation(e.target.value)} />
            </div>
          </div>

          <div className="fg-row">
            <div className="fg">
              <label>Salary</label>
              <input type="text" placeholder="$80k–$100k" value={salary} onChange={e => setSalary(e.target.value)} />
            </div>
            <div className="fg">
              <label>Contact</label>
              <input type="text" placeholder="Contact person" value={contactPerson} onChange={e => setContactPerson(e.target.value)} />
            </div>
          </div>

          <div className="fg">
            <label>Job Link</label>
            <input type="url" placeholder="https://..." value={jobLink} onChange={e => setJobLink(e.target.value)} />
          </div>

          <div className="fg">
            <label>Notes</label>
            <textarea placeholder="Any notes..." value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
        </div>

        {/* modal footer */}
        <div className="modal-foot">
          {onCancel && <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>}
          <button type="submit" className="btn-primary">{isEditing ? "Update" : "Save"}</button>
        </div>
      </form>
    </>
  );
};

export default JobForm;