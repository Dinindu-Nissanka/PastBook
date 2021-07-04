import { object, string, number, array } from 'yup';

const payload = {
  body: object({
    grid: array()
      .required()
      .min(9)
      .max(9)
      .of(
        object().shape({
          id: string().required('Photo Id is required'),
          order: number().required('Order Id is required'),
        })
      ),
  }),
};

// validate the create photo grid request body
export const createPhotoGridSchema = object({
  ...payload,
});
