import { Photo } from '../types/gallery.type';
import { getAuthHeader } from './auth.service';

// Service to get the user uploaded photo list from the backend
export const getUserUploadedPhotos = async (): Promise<Array<Photo>> => {
  const authHeader = getAuthHeader();
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/gallery`, {
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
        return response;
      }
    })
    .then((data) => (data ? data.json() : null));
};
