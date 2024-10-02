import { IFamilyMember } from '../interfaces/FamilyMember';
const apiUrl = 'https://family-tree-task-server.onrender.com/familymembers';
// const apiUrl = 'http://localhost:3000/familymembers';

const fetchData = async (url?: string) => {
  try {
    const response = await fetch(`${apiUrl}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (!response.ok) {
      console.log('error');
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchChildren = async (id: string): Promise<IFamilyMember> =>
  fetchData(id);
export const fetchRootMember = async (root: string): Promise<IFamilyMember> =>
  fetchData(root);
