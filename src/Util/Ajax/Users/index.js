import axios from 'axios';

export const signIn = (data, successCallback, failureCallback) => {
  axios.post(
    '/users/sign_in', {
      user: data,
    }
  ).then((res) => {
    successCallback(res.data, res.headers.authorization);
  }).catch((err) => {
    failureCallback(err.response.data.error);
  });
};