import { useState } from 'react';
import { createFamilyMember } from '../api/fetchFamily';

type newMemberData = {
  parent?: string;
  name: string;
  age: number;
};

type createModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const CreateModal = ({ isOpen, setIsOpen }: createModalProps) => {
  const [data, setData] = useState<newMemberData>({
    parent: '',
    name: '',
    age: 0,
  });

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      parent: event.target.value,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      name: event.target.value,
    });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue)) {
      setData({
        ...data,
        age: newValue,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createFamilyMember('', data);
    setIsOpen(!isOpen);
  };
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
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
              name="parent"
              placeholder="add parent"
              value={data.parent}
              onChange={handleParentChange}
            />
            <input
              type="text"
              name="name"
              placeholder="add name"
              value={data.name}
              onChange={handleNameChange}
            />
            <input
              type="number"
              name="age"
              value={data.age}
              onChange={handleAgeChange}
            />
            <button type="submit">CREATE FAMILY MEMBER</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
