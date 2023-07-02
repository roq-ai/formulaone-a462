import * as yup from 'yup';

export const timerValidationSchema = yup.object().shape({
  time: yup.date().required(),
  race_id: yup.string().nullable(),
});
