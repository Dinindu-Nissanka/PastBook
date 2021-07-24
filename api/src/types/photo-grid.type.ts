interface IPhoto {
  id: string;
  order: number;
}

export interface IPhotoGridInput {
  grid: Array<IPhoto>;
}

export type PhotoGridResponse = {
  email: string;
  grid: Array<{
    id: string;
    order: number;
  }>;
};
