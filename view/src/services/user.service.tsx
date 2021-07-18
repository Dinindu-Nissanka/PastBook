import { Photo } from '../types/user.type';
import { getAuthHeader } from './auth.service';

// Service to get the user uploaded photo list from the backend
export const getUserUploadedPhotos = async (): Promise<Array<Photo>> => {
  const authHeader = getAuthHeader();
  return fetch('http://localhost:3333/api/uploaded-images', {
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
