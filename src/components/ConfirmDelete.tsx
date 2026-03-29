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
      <div className="modal-head">
        <div className="modal-title-text">Delete application?</div>
        <button className="modal-x" onClick={onCancel}>✕</button>
      </div>
      <div className="confirm-body">
        <p>This will permanently remove <strong>"{jobTitle}"</strong>.</p>
        <p style={{ fontSize: 12, color: "var(--text-3)" }}>This action cannot be undone.</p>
      </div>
      <div className="modal-foot">
        <button className="btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn-danger" onClick={onConfirm}>Delete</button>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;