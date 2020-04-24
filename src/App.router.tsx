import React from 'react';
import './index.css';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { RegistrationRouter } from './routes';
import { rootReducer } from './ducks';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

const App: React.FC = function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route component={() => <Redirect to='/registration' />} exact path='/' />
              <Route component={RegistrationRouter} path='/registration/' />
            </Switch>
          )}
        />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
