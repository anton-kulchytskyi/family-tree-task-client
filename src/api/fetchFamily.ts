import { IFamilyMember } from '../interfaces/FamilyMember';
// const apiUrl = 'https://family-tree-task-server.onrender.com/familymembers';
const apiUrl = 'http://localhost:3000/familymembers';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const fetchData = async (
  url: string = '',
  data: any = null,
  method: RequestMethod = 'GET'
) => {
  const options: RequestInit = { method };
  options.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(`${apiUrl}/${url}`, options);
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
export const fetchRootMember = async (root: string): Promise<IFamilyMember[]> =>
  fetchData(root);
export const deleteFamilyMember = async (
  id: string
): Promise<IFamilyMember[]> => fetchData(id, 'DELETE');
export const createFamilyMember = async (
  id: string,
  data: any
): Promise<IFamilyMember[]> => fetchData(id, data, 'POST');
export const updateFamilyMember = async (
  id: string,
  data: any
): Promise<IFamilyMember[]> => fetchData(id, data, 'PUT');
