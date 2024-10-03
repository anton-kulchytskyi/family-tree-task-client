import { useEffect, useState } from 'react';
import { IFamilyMember } from '../interfaces/FamilyMember';
import { fetchChildren } from '../api/fetchFamily';
import Button from './Button';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

type FamilyMemberProps = {
  member: IFamilyMember;
};

const FamilyMember = ({ member }: FamilyMemberProps) => {
  const [children, setChildren] = useState<IFamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteMdal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const promises = member.children.map(async (id) => {
      const response = await fetchChildren(id);
      return response;
    });
    try {
      const results = await Promise.all(promises);
      setChildren(results);
    } catch (error) {
      console.error('Помилка при завантаженні даних:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [deleteModal]);

  const clickHandle = () => {
    !expanded && fetchData();
    setExpanded(!expanded);
  };

  const handleDeleteModal = () => {
    setIsModalOpen(!isModalOpen);
    setDeleteMdal(!deleteModal);
  };

  const handleUpdateModal = () => {
    setIsModalOpen(!isModalOpen);
    setUpdateModal(!updateModal);
  };

  return (
    <div>
      <button
        type="button"
        className="member-name"
        disabled={member.children.length === 0}
        onClick={() => member.children.length > 0 && clickHandle()}
      >
        {member.name}
        {member.children.length > 0 && (expanded ? '▽' : '▷')}
      </button>
      <Button
        text={'✐'}
        click={handleUpdateModal}
      />
      <Button
        text={'✘'}
        click={handleDeleteModal}
      />
      <div className={`child ${expanded ? '' : 'shrunk'}`}>
        {children.length > 0 && (
          <div>
            {children.map((child) => (
              <FamilyMember
                key={child._id}
                member={child}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <DeleteModal
          id={member._id}
          name={member.name}
          handleDeleteModal={handleDeleteModal}
        />
      )}

      {updateModal && (
        <UpdateModal
          id={member._id}
          name={member.name}
          age={member.age}
          handleUpdateModal={handleUpdateModal}
        />
      )}
    </div>
  );
};

export default FamilyMember;
