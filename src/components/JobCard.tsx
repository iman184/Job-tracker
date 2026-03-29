import type { Job } from "../types/Job";

// logo colour palette (matches reference)
const LOGO_COLORS: [string, string][] = [
  ["#dbeafe", "#1e3a5f"],
  ["#ede9fe", "#3730a3"],
  ["#dcfce7", "#14532d"],
  ["#fef3c7", "#78350f"],
  ["#fce7f3", "#831843"],
  ["#e0f2fe", "#0c4a6e"],
];
function getLogoColors(company: string): [string, string] {
  const h = company.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return LOGO_COLORS[h % LOGO_COLORS.length];
}

function fmtDate(d: string) {
  if (!d) return "";
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

type JobCardProps = {
  job: Job;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
  onDeleteClick?: (id: string) => void;
};

const JobCard = ({ job, onEdit, onDeleteClick, onDelete }: JobCardProps) => {
  const [bg, fg] = getLogoColors(job.company);

  return (
    <div className="job-card">
      {/* company row */}
      <div className="card-co-row">
        <div className="card-logo" style={{ background: bg, color: fg }}>
          {job.company.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="card-role">{job.title}</div>
          <div className="card-co">{job.company}</div>
        </div>
      </div>

      {/* tags */}
      {(job.location || job.salary) && (
        <div className="card-tags">
          {job.location  && <span className="tag">{job.location}</span>}
          {job.salary    && <span className="tag">{job.salary}</span>}
        </div>
      )}

      {/* footer */}
      <div className="card-footer">
        <div className="card-date">{fmtDate(job.dateApplied)}</div>
        <div className="card-actions">
          <button className="card-btn" title="Edit" onClick={() => onEdit(job)}>✎</button>
          <button className="card-btn del" title="Delete" onClick={() => onDeleteClick ? onDeleteClick(job.id) : onDelete(job.id)}>✕</button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;