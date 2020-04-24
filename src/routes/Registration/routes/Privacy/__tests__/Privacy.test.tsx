import { fireEvent, wait, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useHistory } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { renderWithProviderWithMockStore } from '../../../../../test-utils';
import { rootReducer } from '../../../../../ducks';

import { Privacy } from '..';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

it('Happy path, user clicks checkboxes and submits', async () => {
  const payload = {
    shouldReceiveUpdates: true,
    shouldReceiveCommunication: true,
  };
  const mockHistory = useHistory();
  const mockStore = configureStore({
    reducer: rootReducer,
  });
  mockStore.dispatch = jest.fn();
  const dispatch = jest.fn();
  const history = jest.fn();
  const { getByLabelText, getByText } = renderWithProviderWithMockStore(
    <MemoryRouter>
      <Privacy />
    </MemoryRouter>,
    mockStore,
  );

  const checkbox1 = screen.getByLabelText('Receive updates about Tray.io product by email');
  const checkbox2 = screen.getByLabelText('Receive communication by email for other products created by Tray.io team');

  await wait(async () => {
    fireEvent.click(getByLabelText('Receive updates about Tray.io product by email'));
  });
  await wait(async () => {
    fireEvent.click(getByLabelText('Receive communication by email for other products created by Tray.io team'));
  });
  await wait(async () => {
    fireEvent.click(getByText('SUBMIT'));
  });
  expect(mockStore.dispatch).toBeCalledWith({ type: 'SET_PRIVACY', payload });
  expect(mockHistory.push).toBeCalledWith('./done');
});
