import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  component: any;
  shouldGoToNextStep: boolean;
  redirectPathName: string;
  path: any;
}

export const StepRoute: React.FC<Props> = ({ component: Component, shouldGoToNextStep, redirectPathName }) => {
  return (
    <Route
      render={(props) => {
        if (shouldGoToNextStep) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: redirectPathName,
              state: { reDirectMessage: 'Please finish current step' },
            }}
          />
        );
      }}
    />
  );
};
