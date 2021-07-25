interface IPhoto {
  id: string;
  order: number;
}

export interface IPhotoGridInput {
  grid: Array<IPhoto>;
}

export type PhotoGrid = {
  email: string;
  grid: Array<{
    id: string;
    order: number;
  }>;
};
