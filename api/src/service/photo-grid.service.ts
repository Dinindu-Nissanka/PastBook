import PhotoGrid, { IPhotoGrid } from '../model/photo-grid.model';
import { IPhotoGridInput } from '../types/photo-grid.type';

// Fetch the photo grid for the given user id
export const findPhotoGrid = async (
  email: string
): Promise<IPhotoGrid | null> => {
  return PhotoGrid.findOne({ email: email });
};

// Create or update photo grid for an user
export const upsertPhotoGrid = async (
  email: string,
  photoGrid: IPhotoGridInput
): Promise<IPhotoGrid> => {
  return PhotoGrid.findOneAndUpdate({ email: email }, photoGrid, {
    upsert: true,
    new: true,
  });
};
