import React from 'react';
import styled from 'styled-components';

import { useTypedSelector } from '../../../../ducks';

export const SuccessText = styled.div`
  color: green;
  padding: 30px;
`;

export const Done = () => {
  const registrationState = useTypedSelector((state) => state.registration);
  const { registrationForm, shouldReceiveCommunication, shouldReceiveUpdates } = registrationState;

  console.log('--final JSON data--');
  console.log(JSON.stringify({ registrationForm, shouldReceiveCommunication, shouldReceiveUpdates }));
  console.log('--final JSON data--');

  return (
    <SuccessText data-testid='testID'>
      Please verify your email address, you should have received an email from us already
    </SuccessText>
  );
};
