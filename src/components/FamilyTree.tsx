import { useState, useEffect } from 'react';
import { IFamilyMember } from '../interfaces/FamilyMember';
import { ITreeNode } from '../interfaces/TreeNode';
import { fetchFamily } from '../api/fetchFamily';

const FamilyTree = () => {
  const [people, setPeople] = useState<IFamilyMember[]>([]);
  const [treeData, setTreeData] = useState<ITreeNode[] | null>([]);

  useEffect(() => {
    fetchFamily().then((res) => {
      setPeople(res);
      const tree = buildTree(res);
      setTreeData(tree);
    });
  }, []);

  const buildTree = (people: IFamilyMember[]): ITreeNode[] => {
    // Створюємо мапу для швидкого доступу до осіб за ID
    const peopleMap = new Map<string, IFamilyMember>();
    people.forEach((person) => peopleMap.set(person._id, person));

    // Знаходимо предків (ті, у кого немає батьків)
    const ancestors = people.filter((person) => person.parents.length === 0);

    // Рекурсивна функція для побудови дерева
    const buildNode = (personId: string): ITreeNode | null => {
      const person = peopleMap.get(personId);
      if (!person) return { data: null, isExpanded: false, children: [] };

      return {
        data: person,
        isExpanded: false, // Спочатку всі вузли згорнуті
        children: person.children
          .map((childId) => buildNode(childId))
          .filter((node) => node !== null),
      };
    };

    return ancestors
      .map((ancestor) => buildNode(ancestor._id))
      .filter((node) => node !== null);
  };

  const toggleNode = (nodeId: string) => {
    setTreeData(
      treeData &&
        treeData.map((node) => {
          if (node.data && node.data._id === nodeId) {
            return { ...node, isExpanded: !node.isExpanded };
          }
          return node;
        })
    );
  };

  const renderNode = (node: ITreeNode) => {
    if (!node.data) return null;
    return (
      <div key={node.data && node.data._id}>
        <span onClick={() => toggleNode(node.data?._id ?? '')}>
          {node.data && node.data.name}
        </span>
        {node.isExpanded && (
          <ul>{node.children.map((child) => renderNode(child))}</ul>
        )}
      </div>
    );
  };

  return <div>{treeData && treeData.map((node) => renderNode(node))}</div>;
};

export default FamilyTree;
