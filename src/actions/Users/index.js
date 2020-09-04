import { UserActionTypes } from './ActionTypes';

export const signUserIn = (userData, authorization) => ({
  type: UserActionTypes.SIGN_USER_IN_UP,
  data: {
    ...userData,
    authorization,
  },
});

export const signUserUp = (userData, authorization) => ({
  type: UserActionTypes.SIGN_USER_IN_UP,
  data: {
    ...userData,
    authorization,
  },
});

export const signUserOut = () => ({
  type: UserActionTypes.SIGN_USER_OUT,
});
