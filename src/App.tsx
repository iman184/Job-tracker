import { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterSort from "./components/FilterSort";
import Statistics from "./components/Statistics";
import Search from "./components/Search";
import Modal from "./components/Modal";
import ConfirmDelete from "./components/ConfirmDelete";
import type { Job } from "./types/Job";

const App = () => {
  // Initialize state from localStorage
    const [jobs, setJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem("jobs");
    console.log("Loaded jobs from localStorage:", stored);
    return stored ? JSON.parse(stored) : [];
  });

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<Set<Job["status"]>>(
    new Set(["Applied", "Interview", "Rejected", "Offer"])
  );
  const [sortBy, setSortBy] = useState<"status" | "title" | "date">("date");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [deleteJobTitle, setDeleteJobTitle] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Save jobs whenever they change
  useEffect(() => {
    console.log("Saving jobs to localStorage:", jobs);
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Delete job by id
  const handleDelete = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    setIsDeleteModalOpen(false);
    setDeleteJobId(null);
    setDeleteJobTitle("");
  };

  // Show delete confirmation
  const handleDeleteClick = (id: string) => {
    const job = jobs.find(j => j.id === id);
    if (job) {
      setDeleteJobId(id);
      setDeleteJobTitle(job.title);
      setIsDeleteModalOpen(true);
    }
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (deleteJobId) {
      handleDelete(deleteJobId);
    }
  };

  // Edit job
  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  // Update job
  const handleUpdate = (updatedJob: Job) => {
    setJobs(prev => prev.map(job => job.id === updatedJob.id ? updatedJob : job));
    setIsModalOpen(false);
    setEditingJob(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  // Handle status filter change
  const handleStatusChange = (status: Job["status"], isChecked: boolean) => {
    const newStatuses = new Set(selectedStatuses);
    if (isChecked) {
      newStatuses.add(status);
    } else {
      newStatuses.delete(status);
    }
    setSelectedStatuses(newStatuses);
  };

  // Filter and sort jobs
  const filteredAndSortedJobs = jobs
    .filter(job => selectedStatuses.has(job.status))
    .filter(job => {
      const searchLower = searchTerm.toLowerCase();
      return job.title.toLowerCase().includes(searchLower) || 
             job.company.toLowerCase().includes(searchLower);
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const statusOrder: Record<Job["status"], number> = {
          "Applied": 1,
          "Interview": 2,
          "Offer": 3,
          "Rejected": 4
        };
        return statusOrder[a.status] - statusOrder[b.status];
      } else {
        // Sort by date (newest first)
        return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
      }
    });

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Job Tracker</h1>
      <JobForm setJobs={setJobs} />
      
      <Statistics jobs={jobs} />
      
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <FilterSort 
        selectedStatuses={selectedStatuses}
        onStatusChange={handleStatusChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <JobList 
        jobs={filteredAndSortedJobs} 
        onDelete={handleDeleteClick} 
        onEdit={handleEdit} 
      />
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {editingJob && (
          <JobForm 
            setJobs={setJobs} 
            editingJob={editingJob}
            onUpdate={handleUpdate}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>

      <ConfirmDelete 
        isOpen={isDeleteModalOpen}
        jobTitle={deleteJobTitle}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeleteJobId(null);
          setDeleteJobTitle("");
        }}
      />
    </div>
  );
};

export default App;