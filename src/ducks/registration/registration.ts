import { createAction, createReducer } from '@reduxjs/toolkit';

import { NextRouterPath } from '../../routes';

export interface SystemState {
  registrationForm: {
    name: string;
    role: string;
    password: string;
    email: string;
  };
  shouldReceiveUpdates: boolean;
  shouldReceiveCommunication: boolean;
  nextRouterPath: NextRouterPath;
}

interface SetFinishedForm {
  type: typeof setFinishedForm;
  payload: FormPayLoad;
}

interface SetReceivedData {
  type: typeof toggleReceivedData;
}

interface SetPrivacy {
  type: typeof setPrivacy;
  payload: PrivacyPayLoad;
}

interface SetNextRoute {
  type: typeof setNextRoute;
  payload: NextRouterPathPayload;
}

type NextRouterPathPayload = {
  nextRouterPath: NextRouterPath;
};

type FormPayLoad = {
  name: string;
  role: string;
  password: string;
  email: string;
};

type PrivacyPayLoad = {
  shouldReceiveUpdates: boolean;
  shouldReceiveCommunication: boolean;
};

export const setNextRoute = createAction('SET_NEXT_ROUTE', function prepare(
  nextRouterPathPayLoad: NextRouterPathPayload,
) {
  return {
    payload: nextRouterPathPayLoad,
  };
});

export const setFinishedForm = createAction('SET_FINISHED_FORM', function prepare(formPayload: FormPayLoad) {
  return {
    payload: formPayload,
  };
});

export const setPrivacy = createAction('SET_PRIVACY', function prepare(privacyPayload: PrivacyPayLoad) {
  return {
    payload: privacyPayload,
  };
});

export const toggleReceivedData = createAction('TOGGLE_RECEIVED_DATA');

export const toggleCommunication = createAction('TOGGLE_RECEIVE_COMMUNICATION');

export const initialState: SystemState = {
  registrationForm: {
    name: '',
    role: '',
    password: '',
    email: '',
  },
  shouldReceiveUpdates: false,
  shouldReceiveCommunication: false,
  nextRouterPath: '/registration/form',
};

export const registrationReducer = createReducer(initialState, {
  SET_FINISHED_FORM: (state, action: SetFinishedForm) => ({
    ...state,
    registrationForm: {
      ...action.payload,
    },
  }),
  SET_PRIVACY: (state, action: SetPrivacy) => ({
    ...state,
    ...action.payload,
  }),
  SET_NEXT_ROUTE: (state, action: SetNextRoute) => ({
    ...state,
    ...action.payload,
  }),
});
