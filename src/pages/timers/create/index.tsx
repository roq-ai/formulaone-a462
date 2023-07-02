import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTimer } from 'apiSdk/timers';
import { Error } from 'components/error';
import { timerValidationSchema } from 'validationSchema/timers';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { RaceInterface } from 'interfaces/race';
import { getRaces } from 'apiSdk/races';
import { TimerInterface } from 'interfaces/timer';

function TimerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TimerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTimer(values);
      resetForm();
      router.push('/timers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TimerInterface>({
    initialValues: {
      time: new Date(new Date().toDateString()),
      race_id: (router.query.race_id as string) ?? null,
    },
    validationSchema: timerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Timer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="time" mb="4">
            <FormLabel>Time</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.time ? new Date(formik.values?.time) : null}
                onChange={(value: Date) => formik.setFieldValue('time', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<RaceInterface>
            formik={formik}
            name={'race_id'}
            label={'Select Race'}
            placeholder={'Select Race'}
            fetcher={getRaces}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'timer',
    operation: AccessOperationEnum.CREATE,
  }),
)(TimerCreatePage);
