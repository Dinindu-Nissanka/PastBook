import User, { IUser, IUserInput } from '../model/user.model';

import uploadedImagesData from '../../data/test.json';

// Create new user in the user database
export function createUser(user: IUserInput): Promise<IUser> {
  return User.create(user);
}

// Fetch and returns user uploaded images list
// Please note that the list was given as a file in the assessment.
// And it only contains one user data. Hence had to read a file and validate against the
// logged in user email
export const fetchUploadedImages = (email: string) => {
  if (email === uploadedImagesData.author.email)
    return uploadedImagesData.entries;
};
