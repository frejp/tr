import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from "./ducks";

function renderWithProvider(
  ui: any,
  {
    store = configureStore({
      reducer: rootReducer,
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function renderWithProviderWithMockStore(ui: any, store: any) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { renderWithProvider, renderWithProviderWithMockStore };
