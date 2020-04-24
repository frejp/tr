import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import * as H from 'history';

import { AppDispatch } from '../../../../App.router';
import { setFinishedForm, setNextRoute, useTypedSelector } from '../../../../ducks';
import { FormikInput, PrimaryButton, FormErrorMessage } from '../../../../components';
import { BoxWrapper, SpacingYSmall } from './styled';
import { Label } from '../../../../components/Label';
import { designTokens } from '../../../../designTokens';

interface FormData {
  name: string;
  role: string;
  password: string;
  email: string;
}

const emptyFormInitialValues: FormData = {
  name: '',
  role: '',
  password: '',
  email: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  role: yup.string().notRequired(),
  email: yup
    .string()
    .email()
    .required('please provide an email address'),
  password: yup
    .string()
    .required('No password provided.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{9,})/,
      'Password must contain at least 9 chars, contains at least one number and one lowercase and uppercase char',
    ),
});

interface HistoryLocationState {
  reDirectMessage?: string;
}

export const RegistrationForm: React.FC = () => {
  const history: H.History<HistoryLocationState> = useHistory();
  const reDirectMessage = history?.location?.state?.reDirectMessage;
  const registrationFormState = useTypedSelector((state) => state.registration.registrationForm);
  const formInitialValues = registrationFormState.email ? registrationFormState : emptyFormInitialValues;

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (formData: FormData) => {
    dispatch(setFinishedForm(formData));
    dispatch(setNextRoute({ nextRouterPath: '/registration/privacy' }));
    history.push(`./privacy`);
  };

  return (
    <>
      {reDirectMessage ? <FormErrorMessage color={designTokens.red}>{reDirectMessage}</FormErrorMessage> : null}
      <Formik initialValues={formInitialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form>
          <BoxWrapper>
            <SpacingYSmall />
            <Label htmlFor='name'>name</Label>
            <FormikInput id='name' name='name' placeholder='ex John Doe' type='text' />
            <Label htmlFor='role'>role</Label>
            <FormikInput id='role' name='role' placeholder='ex DB Admin' type='text' />
            <Label htmlFor='email'>email</Label>
            <FormikInput id='email' name='email' placeholder='enter email' type='email' />
            <Label htmlFor='password'>password</Label>
            <FormikInput id='password' name='password' placeholder='enter password' type='password' />
            <PrimaryButton type='submit'>SUBMIT</PrimaryButton>
          </BoxWrapper>
        </Form>
      </Formik>
    </>
  );
};
