import { useState } from 'react';
import { updateFamilyMember } from '../api/fetchFamily';

type UpdateModalProps = {
  id: string;
  name: string;
  age: number;
  handleUpdateModal: () => void;
};

const UpdateModal = ({
  id,
  name,
  age,
  handleUpdateModal,
}: UpdateModalProps) => {
  const [updateName, setUpdateName] = useState(name);
  const [updateAge, setUpdateAge] = useState(age);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateName(event.currentTarget.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue)) {
      setUpdateAge(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: updateName,
      age: updateAge,
    };

    console.log(data);

    updateFamilyMember(id, data);
    setUpdateName('');
    setUpdateAge(0);
    handleUpdateModal();
  };
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            onClick={() => handleUpdateModal()}
          >
            Close modal
          </button>
        </div>
        <div className="modal">
          <form
            action=""
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="update name"
              value={updateName}
              onChange={handleNameChange}
            />
            <input
              type="number"
              name="age"
              value={updateAge}
              onChange={handleAgeChange}
            />
            <button type="submit">UPDATE FAMILY MEMBER</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
