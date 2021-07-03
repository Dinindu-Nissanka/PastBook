import PhotoGrid, { IPhotoGrid } from '../model/photo-grid.model';

// Fetch the photo grid for the given user id
export const findPhotoGrid = (id: string) => {
  return PhotoGrid.findOne({ userId: id });
};

// Create or update photo grid for an user
export const upsertPhotoGrid = (userId: string, photoGrid: IPhotoGrid) => {
  return PhotoGrid.findOneAndUpdate({ userId: userId }, photoGrid, {
    upsert: true,
    new: true,
  });
};
