import { deleteFamilyMember } from '../api/fetchFamily';

type DeteleModalProps = {
  id: string;
  name: string;
  handleDeleteModal: () => void;
};

const DeteleModal = ({ id, name, handleDeleteModal }: DeteleModalProps) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            onClick={() => handleDeleteModal}
          >
            Close modal
          </button>
        </div>
        <div className="modal">
          <h2>{`Are you sure you want to delete ${name}?`}</h2>
          <p>This action cannot be undone.</p>
          <button
            type="button"
            className="anwer-button"
            onClick={() => {
              handleDeleteModal();
            }}
          >
            NO
          </button>
          <button
            type="button"
            onClick={() => {
              deleteFamilyMember(id);
              handleDeleteModal();
            }}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeteleModal;
