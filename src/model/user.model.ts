import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface IUserInput {
  name: string;
  password: string;
  email: string;
}

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  // Random additional data
  const salt = await bcrypt.genSalt(config.get('password.salt'));
  const hash = bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (password: string) {
  const user = this as IUser;

  return bcrypt.compare(password, user.password).catch((e: Error) => false);
};

const User: Model<IUser> = model('user', UserSchema);

export default User;
