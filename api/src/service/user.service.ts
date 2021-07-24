import User, { IUser, IUserInput } from '../model/user.model';

// Create new user in the user database
export const createUser = async (user: IUserInput): Promise<IUser> => {
  return User.create(user);
};
