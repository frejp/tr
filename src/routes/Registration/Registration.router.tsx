import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import * as H from 'history';

import { RegistrationForm, Done, Privacy } from './routes';
import { useTypedSelector } from '../../ducks';
import { StepRoute } from '../../components/StepRoute/StepRoute';
import { TabRouterComponent } from '../../components';

interface HistoryLocationState {
  reDirectMessage?: string;
}

export type NextRouterPath = '/registration/form' | '/registration/privacy' | '/registration/done';

const routeToStep = {
  '/registration/form': 0,
  '/registration/privacy': 1,
  '/registration/done': 2,
};

const routerPaths = [
  { text: 'user', routerPath: '/registration/form' },
  { text: 'privacy', routerPath: '/registration/privacy' },
  { text: 'done', routerPath: '/registration/done' },
];

export const RegistrationRouter: React.FC = function App() {
  const nextRouterPath = useTypedSelector((state) => state.registration.nextRouterPath);
  const history: H.History<HistoryLocationState> = useHistory();
  const shouldGoToNextStep = routeToStep[history.location.pathname] <= routeToStep[nextRouterPath];
  const redirectPathName = nextRouterPath;

  return (
    <TabRouterComponent routerPaths={routerPaths}>
      <Switch>
        <Route component={() => <Redirect to='/registration/form' />} exact path='/registration' />
        <Route component={RegistrationForm} path='/registration/form' />
        <StepRoute
          component={Privacy}
          path='/registration/privacy/'
          redirectPathName={redirectPathName}
          shouldGoToNextStep={shouldGoToNextStep}
        />
        <StepRoute
          component={Done}
          path='/registration/done/'
          redirectPathName={redirectPathName}
          shouldGoToNextStep={shouldGoToNextStep}
        />
      </Switch>
    </TabRouterComponent>
  );
};
