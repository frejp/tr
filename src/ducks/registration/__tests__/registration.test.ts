import { setPrivacy, setFinishedForm, registrationReducer } from '..';

describe('registration actions', () => {
  it('should create an action to set the finished registration form', () => {
    const payload = {
      name: 'string',
      role: 'string',
      password: 'string',
      email: 'string',
    };
    const expectedAction = {
      type: 'SET_FINISHED_FORM',
      payload,
    };
    expect(setFinishedForm(payload)).toEqual(expectedAction);
  });

  it('should create an action to set the privacy choices', () => {
    const payload = {
      shouldReceiveUpdates: false,
      shouldReceiveCommunication: false,
    };
    const expectedAction = {
      type: 'SET_PRIVACY',
      payload,
    };
    expect(setPrivacy(payload)).toEqual(expectedAction);
  });
});

describe('registration reducer', () => {
  it('should return the initial state', () => {
    expect(registrationReducer(undefined, {})).toEqual({
      registrationForm: {
        name: '',
        role: '',
        password: '',
        email: '',
      },
      shouldReceiveUpdates: false,
      shouldReceiveCommunication: false,
      nextRouterPath: '/registration/form',
    });
  });
  it('should set a finished form', () => {
    const payload = {
      name: 'string',
      role: 'string',
      password: 'string',
      email: 'string',
    };
    expect(registrationReducer(undefined, setFinishedForm(payload))).toEqual({
      registrationForm: {
        name: 'string',
        role: 'string',
        password: 'string',
        email: 'string',
      },
      shouldReceiveUpdates: false,
      shouldReceiveCommunication: false,
      nextRouterPath: '/registration/form',
    });
  });
  it('should set privacy choices', () => {
    const payload = {
      shouldReceiveUpdates: true,
      shouldReceiveCommunication: true,
    };
    expect(registrationReducer(undefined, setPrivacy(payload))).toEqual({
      registrationForm: {
        name: '',
        role: '',
        password: '',
        email: '',
      },
      shouldReceiveUpdates: true,
      shouldReceiveCommunication: true,
      nextRouterPath: '/registration/form',
    });
  });
});
