import { AlreadyExistsException, NotFoundException } from '../exceptions';
import PhotoGridModel, { RawPhotoGrid } from '../model/photo-grid.model';
import { IPhotoGridInput, PhotoGrid } from '../types/photo-grid.type';

// Fetch the photo grid for the given user id
export const findPhotoGrid = async (
  email: string
): Promise<PhotoGrid | null> => {
  const photoGrid: RawPhotoGrid | null = await PhotoGridModel.findOne({
    email: email,
  });

  if (photoGrid) {
    return convert(photoGrid);
  }
  return null;
};

// Create new photo grid for the user
export const createPhotoGrid = async (
  email: string,
  photoGrid: IPhotoGridInput
): Promise<PhotoGrid> => {
  const isPhotoGridExist: RawPhotoGrid | null = await PhotoGridModel.findOne({
    email: email,
  });

  if (isPhotoGridExist) {
    throw new AlreadyExistsException(
      `Cannot create a new photo grid. User already has an existing photo grid`
    );
  }
  const updatedPhotoGrid: RawPhotoGrid = await PhotoGridModel.create({
    email: email,
    grid: photoGrid.grid,
  });
  return convert(updatedPhotoGrid);
};

// Update photo grid of an user
export const updatePhotoGrid = async (
  email: string,
  photoGrid: IPhotoGridInput
): Promise<PhotoGrid> => {
  const updatedPhotoGrid: RawPhotoGrid | null =
    await PhotoGridModel.findOneAndUpdate({ email: email }, photoGrid, {
      new: true,
    });

  if (!updatedPhotoGrid) {
    throw new NotFoundException(
      `No photo grid was found for the requested user`
    );
  }

  return convert(updatedPhotoGrid);
};

// Mapping function to convert document object to PhotoGrid object
const convert = (photoGrid: RawPhotoGrid): PhotoGrid => {
  return {
    email: photoGrid.email,
    grid: photoGrid.grid.map((entry) => ({ id: entry.id, order: entry.order })),
  };
};
