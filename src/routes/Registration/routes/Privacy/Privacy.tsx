import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as H from 'history';
import { useHistory } from 'react-router-dom';

import { setNextRoute, setPrivacy } from '../../../../ducks/registration';
import { AppDispatch } from '../../../../App.router';
import { FormWrapper, PrimaryButton, FormErrorMessage } from '../../../../components';
import { designTokens } from '../../../../designTokens';
import { useTypedSelector } from '../../../../ducks';

export const InputWrapper = styled.div`
  margin-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-left: 6px;
  margin-top: 0px;
  margin-right: 4px;
`;

interface HistoryLocationState {
  reDirectMessage?: string;
}

export const Privacy: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history: H.History<HistoryLocationState> = useHistory();
  const reDirectMessage = history?.location?.state?.reDirectMessage;
  const registrationFormState = useTypedSelector((state) => state.registration);

  // I differ localstate from -submitted- global state.
  const [shouldReceiveUpdates, setShouldReceiveUpdates] = useState(registrationFormState.shouldReceiveUpdates);
  const [shouldReceiveCommunication, setShouldReceiveCommunication] = useState(
    registrationFormState.shouldReceiveCommunication,
  );

  const handleReceiveUpdates = () => {
    setShouldReceiveUpdates(!shouldReceiveUpdates);
  };

  const handleReceiveCommunication = () => {
    setShouldReceiveCommunication(!shouldReceiveCommunication);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      setPrivacy({
        shouldReceiveUpdates,
        shouldReceiveCommunication,
      }),
    );
    dispatch(setNextRoute({ nextRouterPath: '/registration/done' }));
    history.push(`./done`);
  };

  return (
    <>
      {reDirectMessage ? <FormErrorMessage color={designTokens.red}>{reDirectMessage}</FormErrorMessage> : null}
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <input
              checked={shouldReceiveUpdates}
              id='receiveUpdates'
              name='receiveUpdates'
              onChange={handleReceiveUpdates}
              type='checkbox'
            />
            <Label htmlFor='receiveUpdates'>Receive updates about Tray.io product by email</Label>
          </InputWrapper>
          <InputWrapper>
            <input
              checked={shouldReceiveCommunication}
              id='receiveCommunication'
              name='receiveCommunication'
              onChange={handleReceiveCommunication}
              type='checkbox'
            />
            <Label htmlFor='receiveCommunication'>
              Receive communication by email for other products created by Tray.io team
            </Label>
          </InputWrapper>
          <PrimaryButton type='submit'>SUBMIT</PrimaryButton>
        </form>
      </FormWrapper>
    </>
  );
};
