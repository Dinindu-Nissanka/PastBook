interface IPhoto {
  id: string;
  order: number;
}

export interface IPhotoGridInput {
  grid: Array<IPhoto>;
}
