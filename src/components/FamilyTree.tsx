import { useState, useEffect } from 'react';
import { IFamilyMember } from '../interfaces/FamilyMember';
import { fetchRootMember } from '../api/fetchFamily';

import FamilyMember from './FamilyMember';

const FamilyTree = () => {
  const [root, setRoot] = useState<IFamilyMember[]>([]);

  useEffect(() => {
    fetchRootMember('root').then((res) => {
      setRoot(res);
    });
  }, []);

  return (
    <div className="tree">
      {root.map((member) => (
        <FamilyMember
          key={member._id}
          member={member}
        />
      ))}
    </div>
  );
};

export default FamilyTree;
