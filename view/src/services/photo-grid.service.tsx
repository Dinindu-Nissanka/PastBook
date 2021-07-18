import { Grid } from '../types/photo-grid.type';
import { getAuthHeader } from './auth.service';

// Service to get the user stored photo grid from the backend
export const getUserPhotoGrid = async (): Promise<Grid> => {
  const authHeader = getAuthHeader();
  return fetch('http://localhost:3333/api/photogrid', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authHeader}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else if (response.status === 404) {
        return null;
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((data) => (data ? data.json() : null));
};

export const createOrUpdateUserPhotoGrid = async (
  grid: Grid
): Promise<Grid> => {
  const authHeader = getAuthHeader();
  return fetch('http://localhost:3333/api/photogrid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authHeader}`,
    },
    body: JSON.stringify(grid),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((data) => (data ? data.json() : null));
};
