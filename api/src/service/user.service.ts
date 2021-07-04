import axios from 'axios';
import User, { IUser, IUserInput } from '../model/user.model';
import config from 'config';

import { HttpException } from '../exceptions';
import { UploadedImagesResponse } from '../types/uploaded-images.type';

// Create new user in the user database
export const createUser = async (user: IUserInput): Promise<IUser> => {
  return User.create(user);
};

// Fetch data from the given url
export const fetchFromUrl = async (
  email: string
): Promise<UploadedImagesResponse | null> => {
  try {
    const response = await axios.get(config.get('uploadedImages.url'));
    const { data } = response;
    if (data.author && data.author.email && data.author.email === email) {
      return data.entries;
    }
    return null;
  } catch (error) {
    throw new HttpException(
      500,
      'Error occurred while fetching uploaded images',
      error
    );
  }
};
