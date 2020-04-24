import { fireEvent, wait, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useHistory } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { renderWithProvider, renderWithProviderWithMockStore } from '../../../../../test-utils';
import { rootReducer } from '../../../../../ducks';

import { RegistrationForm } from '..';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

it('Happy Path, Fills in the form and clicks submit', async () => {
  const payload = {
    name: 'David Seaman',
    role: 'Goalkeeper',
    password: '1234easyY!',
    email: 'david.seaman@gmail.com',
  };
  const mockHistory = useHistory();
  const mockStore = configureStore({
    reducer: rootReducer,
  });
  mockStore.dispatch = jest.fn();
  const { getByText } = renderWithProviderWithMockStore(
    <MemoryRouter>
      <RegistrationForm />
    </MemoryRouter>,
    mockStore,
  );

  const name = screen.getByLabelText('name', { selector: 'input' });
  const role = screen.getByLabelText('role', { selector: 'input' });
  const email = screen.getByLabelText('email', { selector: 'input' });
  const password = screen.getByLabelText('password', { selector: 'input' });

  await wait(async () => {
    fireEvent.change(name, { target: { value: 'David Seaman' } });
  });
  await wait(async () => {
    fireEvent.change(role, { target: { value: 'Goalkeeper' } });
  });
  await wait(async () => {
    fireEvent.change(email, { target: { value: 'david.seaman@gmail.com' } });
  });
  await wait(async () => {
    fireEvent.change(password, { target: { value: '1234easyY!' } });
  });
  await wait(async () => {
    fireEvent.click(getByText('SUBMIT'));
  });
  expect(mockStore.dispatch).toBeCalledWith({ type: 'SET_FINISHED_FORM', payload });
  expect(mockHistory.push).toHaveBeenCalledWith('./privacy');
});

it('should give error if the user just clicks submit without filling in all the fields', async () => {
  const { getByText } = renderWithProvider(
    <MemoryRouter>
      <RegistrationForm />
    </MemoryRouter>,
  );
  await wait(async () => {
    fireEvent.click(getByText('SUBMIT'));
  });
  expect(getByText('name is a required field')).toBeVisible();
  expect(getByText('please provide an email address')).toBeVisible();
  expect(getByText('No password provided.')).toBeVisible();
});

it('Gives errors if email and password is the wrong form', async () => {
  const { getByText } = renderWithProvider(
    <MemoryRouter>
      <RegistrationForm />
    </MemoryRouter>,
  );
  const email = screen.getByLabelText('email', { selector: 'input' });
  const password = screen.getByLabelText('password', { selector: 'input' });
  await wait(async () => {
    fireEvent.change(email, { target: { value: 'david.seaman@gmail.com' } });
  });
  await wait(async () => {
    fireEvent.change(password, { target: { value: '1234easyY!' } });
  });
  await wait(async () => {
    fireEvent.click(getByText('SUBMIT'));
  });
});
