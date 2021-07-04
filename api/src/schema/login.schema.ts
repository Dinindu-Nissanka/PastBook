import { object, string } from 'yup';

const payload = {
  body: object({
    email: string().email().required(),
    password: string().min(8).max(12).required(),
  }),
};

// validate the login request body
export const loginSchema = object({
  ...payload,
});
