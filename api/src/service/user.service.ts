import { HttpException } from '../exceptions';
import UserModel, { RawUser } from '../model/user.model';
import { IUserInput, User } from '../types/user.type';

// Create new user in the user database
export const createUser = async (userInput: IUserInput): Promise<User> => {
  const user: RawUser = await UserModel.create(userInput);
  return convert(user);
};

// Get user by the email
export const getUser = async (email: string): Promise<User | null> => {
  const user: RawUser | null = await UserModel.findOne({ email });

  if (user) {
    return convert(user);
  }
  return null;
};

// Method to verify the user login
export const verifyLogin = async (
  email: string,
  password: string
): Promise<User> => {
  const user: RawUser | null = await UserModel.findOne({ email });
  if (!user) {
    throw new HttpException(403, 'User not found');
  }
  const isPasswordMatching = await user.comparePassword(password);
  if (!isPasswordMatching) {
    throw new HttpException(403, 'Incorrect username or password');
  }
  return convert(user);
};

// Convert raw user document to User type
const convert = (user: RawUser): User => {
  return {
    name: user.name,
    email: user.email,
  };
};
