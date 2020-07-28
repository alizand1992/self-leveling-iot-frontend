import { UserActionTypes } from '../../actions/Users/ActionTypes';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_USER_IN:
      return {
        ...action.data,
      };

    default:
      return state;
  }
};
