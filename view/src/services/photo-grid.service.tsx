import { Grid } from '../types/photo-grid.type';
import { getAuthHeader } from './auth.service';

// Service to get the user stored photo grid from the backend
export const getUserPhotoGrid = async (): Promise<Grid> => {
  const authHeader = getAuthHeader();
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/photogrid`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authHeader}`,
    },
  })
    .then((response) => {
      if (response.status === 404) {
        return null;
      } else {
        return response;
      }
    })
    .then((data) => (data ? data.json() : null));
};

// export const createOrUpdateUserPhotoGrid = async (
//   grid: Grid
// ): Promise<Grid> => {
//   const authHeader = getAuthHeader();
//   return fetch(`${process.env.REACT_APP_BACKEND_URL}/photogrid`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${authHeader}`,
//     },
//     body: JSON.stringify(grid),
//   })
//     .then((response) => {
//       return response;
//     })
//     .then((data) => (data ? data.json() : null));
// };

export const createUserPhotoGrid = async (grid: Grid): Promise<Grid> => {
  const authHeader = getAuthHeader();
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/photogrid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authHeader}`,
    },
    body: JSON.stringify(grid),
  })
    .then((response) => {
      return response;
    })
    .then((data) => (data ? data.json() : null));
};

export const updateUserPhotoGrid = async (grid: Grid): Promise<Grid> => {
  const authHeader = getAuthHeader();
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/photogrid`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${authHeader}`,
    },
    body: JSON.stringify(grid),
  })
    .then((response) => {
      return response;
    })
    .then((data) => (data ? data.json() : null));
};
