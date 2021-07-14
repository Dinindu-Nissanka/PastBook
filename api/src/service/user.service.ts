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
export const fetchImagesFromUrl = async (
  email: string
): Promise<UploadedImagesResponse | null> => {
  // This email should be validated against the response
  // or it should be used while fetching data
  // but since I have given a common url, this email parameter is not needed
  try {
    const response = await axios.get(config.get('uploadedImages.url'));
    const { data } = response;
    return data.entries;
  } catch (error) {
    throw new HttpException(
      500,
      'Error occurred while fetching uploaded images',
      error
    );
  }
};
