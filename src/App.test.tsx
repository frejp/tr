import React from 'react';
import { cleanup, fireEvent, render, screen, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App.router';
import { renderWithProvider } from './test-utils';

test('Click on tab without submitting anything should give an error', async () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  await wait(async () => {
    fireEvent.click(getByText('privacy'));
  });
  expect(getByText('Please finish current step')).toBeVisible();
});

test('Integration test, Happy path for the whole registration flow', async () => {
  const { getByLabelText, getByText } = renderWithProvider(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
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
  expect(getByLabelText('Receive updates about Tray.io product by email')).toBeVisible();
  const privacyTab = screen.getByText('privacy', { selector: 'a' });
  expect(privacyTab).toHaveStyle({ backgroundColor: 'grey' });
  await wait(async () => {
    fireEvent.click(getByText('SUBMIT'));
  });
  expect(
    getByText('Please verify your email address, you should have received an email from us already'),
  ).toBeVisible();
  const doneTab = screen.getByText('done', { selector: 'a' });
  expect(doneTab).toHaveStyle({ backgroundColor: 'grey' });

});
