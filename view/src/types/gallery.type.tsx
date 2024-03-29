export type Photo = {
  id: number;
  message: string;
  picture: string;
  pictureSmall: string;
  pictureMedium: string;
  pictureStored: string;
  timestamp: number;
};

export interface PhotoGallery extends Photo {
  isSelected: boolean;
}
