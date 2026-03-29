import type { Job } from "../types/Job";

type StatisticsProps = {
  jobs: Job[];
};

const Statistics = ({ jobs }: StatisticsProps) => {
  const counts = {
    Applied: jobs.filter(j => j.status === "Applied").length,
    Interview: jobs.filter(j => j.status === "Interview").length,
    Offer: jobs.filter(j => j.status === "Offer").length,
    Rejected: jobs.filter(j => j.status === "Rejected").length,
  };

  return (
    <div style={{
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      flexWrap: "wrap",
      justifyContent: "center"
    }}>
      <div style={{ padding: "10px 15px", backgroundColor: "#e8f4f8", borderRadius: "6px", border: "1px solid #b3d9e8" }}>
        <strong style={{ color: "#0066cc" }}>Applied:</strong> {counts.Applied}
      </div>
      <div style={{ padding: "10px 15px", backgroundColor: "#fff4e6", borderRadius: "6px", border: "1px solid #ffd699" }}>
        <strong style={{ color: "#ff9900" }}>Interview:</strong> {counts.Interview}
      </div>
      <div style={{ padding: "10px 15px", backgroundColor: "#e6f9e6", borderRadius: "6px", border: "1px solid #99dd99" }}>
        <strong style={{ color: "#00aa00" }}>Offer:</strong> {counts.Offer}
      </div>
      <div style={{ padding: "10px 15px", backgroundColor: "#ffe6e6", borderRadius: "6px", border: "1px solid #ff9999" }}>
        <strong style={{ color: "#cc0000" }}>Rejected:</strong> {counts.Rejected}
      </div>
    </div>
  );
};

export default Statistics;
