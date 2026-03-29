import { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterSort from "./components/FilterSort";
import Statistics from "./components/Statistics";
import Search from "./components/Search";
import Modal from "./components/Modal";
import ConfirmDelete from "./components/ConfirmDelete";
import type { Job } from "./types/Job";

// logo colour palette (same as reference)
const LOGO_COLORS: [string, string][] = [
  ["#dbeafe", "#1e3a5f"],
  ["#ede9fe", "#3730a3"],
  ["#dcfce7", "#14532d"],
  ["#fef3c7", "#78350f"],
  ["#fce7f3", "#831843"],
  ["#e0f2fe", "#0c4a6e"],
];
export function getLogoColors(company: string): [string, string] {
  const h = company.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return LOGO_COLORS[h % LOGO_COLORS.length];
}

export type Status = Job["status"];
export const STATUSES: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

const App = () => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem("jobs");
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

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleDelete = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    setIsDeleteModalOpen(false);
    setDeleteJobId(null);
    setDeleteJobTitle("");
  };

  const handleDeleteClick = (id: string) => {
    const job = jobs.find(j => j.id === id);
    if (job) {
      setDeleteJobId(id);
      setDeleteJobTitle(job.title);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteJobId) handleDelete(deleteJobId);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedJob: Job) => {
    setJobs(prev => prev.map(job => job.id === updatedJob.id ? updatedJob : job));
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleStatusChange = (status: Job["status"], isChecked: boolean) => {
    const newStatuses = new Set(selectedStatuses);
    if (isChecked) newStatuses.add(status);
    else newStatuses.delete(status);
    setSelectedStatuses(newStatuses);
  };

  const filteredAndSortedJobs = jobs
    .filter(job => selectedStatuses.has(job.status))
    .filter(job => {
      const q = searchTerm.toLowerCase();
      return job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "status") {
        const order: Record<Job["status"], number> = { Applied: 1, Interview: 2, Offer: 3, Rejected: 4 };
        return order[a.status] - order[b.status];
      }
      return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
    });

  return (
    <div className="shell">

      {/* ── topbar ── */}
      <div className="topbar">
        <div className="brand">
          <span className="brand-bracket">[</span>jb<span className="brand-bracket">]</span> JobTracker
        </div>

        {/* no view toggle — keeping original single-view layout */}
        <div className="topbar-center" />

        <div className="topbar-right">
          <button className="add-btn" onClick={() => { setEditingJob(null); setIsModalOpen(true); }}>
            + Add
          </button>
        </div>
      </div>

      {/* ── pipeline bar (Statistics) ── */}
      <Statistics jobs={jobs} />

      {/* ── search ── */}
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* ── filters ── */}
      <FilterSort
        selectedStatuses={selectedStatuses}
        onStatusChange={handleStatusChange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* ── kanban board ── */}
      <div className="kanban-wrap">
        {STATUSES.map(status => {
          const colJobs = filteredAndSortedJobs.filter(j => j.status === status);
          return (
            <div key={status} className={`kanban-col col-${status.toLowerCase()}`}>
              <div className="col-header">
                <div className="col-title">
                  <span className="col-title-dot" />
                  {status}
                </div>
                <div className="col-count">{colJobs.length}</div>
              </div>
              <div className="cards-list">
                <JobList jobs={colJobs} onDelete={handleDeleteClick} onEdit={handleEdit} />
              </div>
              <button
                className="col-add-btn"
                onClick={() => {
                  setEditingJob({ id: "", title: "", company: "", status, dateApplied: new Date().toISOString().split("T")[0] } as Job);
                  setIsModalOpen(true);
                }}
              >
                + Add card
              </button>
            </div>
          );
        })}
      </div>

      {/* ── edit/add modal ── */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <JobForm
          setJobs={setJobs}
          editingJob={editingJob ?? undefined}
          onUpdate={handleUpdate}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* ── confirm delete ── */}
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