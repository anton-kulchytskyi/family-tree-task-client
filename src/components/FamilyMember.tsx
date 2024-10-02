import { useState } from 'react';
import { IFamilyMember } from '../interfaces/FamilyMember';
import { fetchChildren } from '../api/fetchFamily';

type FamilyMemberProps = {
  member: IFamilyMember;
};

const FamilyMember = ({ member }: FamilyMemberProps) => {
  const [children, setChildren] = useState<IFamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  const clickHandle = () => {
    fetchData();
    member.children?.length > 0 && setExpanded(!expanded);
  };
  return (
    <>
      <button
        type="button"
        onClick={clickHandle}
      >
        {member.name}
      </button>
      <div className={`${expanded ? '' : 'shrunk'}`}>
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
    </>
  );
};

export default FamilyMember;
