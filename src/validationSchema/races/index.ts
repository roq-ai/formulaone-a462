import * as yup from 'yup';

export const raceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().required(),
  organization_id: yup.string().nullable(),
});
