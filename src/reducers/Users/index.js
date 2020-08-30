import { UserActionTypes } from '../../actions/Users/ActionTypes';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_USER_IN_UP:
      return {
        ...action.data,
      };

    case UserActionTypes.SIGN_USER_OUT:
      return {};

    default:
      return state;
  }
};
