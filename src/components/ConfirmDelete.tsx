import Modal from "./Modal";

type ConfirmDeleteProps = {
  isOpen: boolean;
  jobTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDelete = ({ isOpen, jobTitle, onConfirm, onCancel }: ConfirmDeleteProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3 style={{ marginTop: 0 }}>Delete Job?</h3>
        <p style={{ marginBottom: "20px" }}>
          Are you sure you want to delete <strong>"{jobTitle}"</strong>?
        </p>
        <p style={{ fontSize: "0.9em", color: "#666", marginBottom: "20px" }}>
          This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: "#cc0000",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1em"
            }}
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            style={{
              backgroundColor: "#999",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1em"
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
