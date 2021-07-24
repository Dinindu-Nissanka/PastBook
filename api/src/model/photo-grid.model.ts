import { model, Schema, Model, Document } from 'mongoose';

export interface RawPhoto {
  id: string;
  order: number;
}

export interface RawPhotoGrid extends Document {
  email: string;
  grid: Array<RawPhoto>;
  createdAt: Date;
  updatedAt: Date;
}

const PhotoGridSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    grid: { type: Array },
  },
  { timestamps: true }
);

const PhotoGridModel: Model<RawPhotoGrid> = model('PhotoGrid', PhotoGridSchema);

export default PhotoGridModel;
