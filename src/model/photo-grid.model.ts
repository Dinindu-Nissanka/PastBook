import { model, Schema, Model, Document } from 'mongoose';

export interface IPhoto {
  id: string;
  order: number;
}

export interface IPhotoGrid extends Document {
  userId: string;
  grid: Array<IPhoto>;
  createdAt: Date;
  updatedAt: Date;
}

const PhotoGridSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    grid: { type: Array },
  },
  { timestamps: true }
);

const PhotoGrid: Model<IPhotoGrid> = model('PhotoGrid', PhotoGridSchema);

export default PhotoGrid;
