interface Entry {
  id: number;
  message: string;
  picture: string;
  pictureSmall: string;
  pictureMedium: string;
  pictureStored: string;
  timestamp: number;
}

export interface UploadedImagesResponse {
  id: number;
  code: string;
  startDate: number;
  endDate: number;
  author: {
    id: string;
    createdAt: Date;
    name: string;
    firstName: string;
    lastName: string;
    picture: string;
    source: string;
    lang: string;
    country: string;
    sourceId: string;
    email: string;
  };
  cover: string;
  is_shareable: boolean;
  entries: Array<Entry>;
}
