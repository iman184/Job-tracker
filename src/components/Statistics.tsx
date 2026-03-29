import type { Job } from "../types/Job";

type StatisticsProps = { jobs: Job[] };

const Statistics = ({ jobs }: StatisticsProps) => {
  const total = jobs.length || 1;
  const counts = {
    Applied:   jobs.filter(j => j.status === "Applied").length,
    Interview: jobs.filter(j => j.status === "Interview").length,
    Offer:     jobs.filter(j => j.status === "Offer").length,
    Rejected:  jobs.filter(j => j.status === "Rejected").length,
  };

  return (
    <div className="progress-bar-wrap">
      <div className="prog-label">pipeline</div>
      <div className="prog-track">
        <div className="prog-seg" style={{ background: "#3b82f6", width: `${Math.round(counts.Applied   / total * 100)}%` }} />
        <div className="prog-seg" style={{ background: "#f59e0b", width: `${Math.round(counts.Interview / total * 100)}%` }} />
        <div className="prog-seg" style={{ background: "#22c55e", width: `${Math.round(counts.Offer     / total * 100)}%` }} />
        <div className="prog-seg" style={{ background: "#ef4444", width: `${Math.round(counts.Rejected  / total * 100)}%` }} />
      </div>
      <div className="prog-legend">
        <div className="prog-item"><div className="prog-dot" style={{ background: "#3b82f6" }} /><span>{counts.Applied} applied</span></div>
        <div className="prog-item"><div className="prog-dot" style={{ background: "#f59e0b" }} /><span>{counts.Interview} interview</span></div>
        <div className="prog-item"><div className="prog-dot" style={{ background: "#22c55e" }} /><span>{counts.Offer} offer</span></div>
        <div className="prog-item"><div className="prog-dot" style={{ background: "#ef4444" }} /><span>{counts.Rejected} rejected</span></div>
      </div>
    </div>
  );
};

export default Statistics;