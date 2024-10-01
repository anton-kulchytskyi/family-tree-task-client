import { IFamilyMember } from '../interfaces/FamilyMember';
const apiUrl = 'https://family-tree-task-server.onrender.com';

export const fetchFamily = async (): Promise<IFamilyMember[]> => {
  try {
    const response = await fetch(`${apiUrl}/familymembers`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
