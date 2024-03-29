import axios from 'axios';
import config from 'config';

import { HttpException } from '../exceptions';
import { Gallery } from '../types/galley.type';

// Fetch data from the given url
export const fetchImagesFromUrl = async (
  email: string
): Promise<Gallery | null> => {
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
      'Error occurred while fetching the uploaded images',
      error
    );
  }
};
