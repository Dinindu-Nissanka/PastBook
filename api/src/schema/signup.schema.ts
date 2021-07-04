import { object, string } from 'yup';

const payload = {
  body: object({
    email: string().email().required(),
    password: string().min(8).max(12).required(),
    name: string().required(),
  }),
};

// validate the singup request body
export const signUpSchema = object({
  ...payload,
});
