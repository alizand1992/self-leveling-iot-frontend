import { UserActionTypes } from './ActionTypes';

export const signUserIn = (userData, authorization) => ({
  type: UserActionTypes.SIGN_USER_IN,
  data: {
    ...userData,
    authorization,
  },
});
