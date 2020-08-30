import axios from 'axios';

export const signIn = (data, successCallback, failureCallback) => {
  axios.post(
    '/users/sign_in', {
      user: data,
    }
  ).then((res) => {
    successCallback(res.data, res.headers.authorization);
  }).catch((err) => {
    if (err.response && err.response.data.error) {
      failureCallback(err.response.data.error);
    } else {
      failureCallback('An unknown error has occurred.');
    }
  });
};

export const signUp = (data, successCallback, failureCallback) => {
  axios.post(
    '/users', {
      user: data,
    }
  ).then((res) => {
    successCallback(res.data, res.headers.authorization);
  }).catch((err) => {
    if (err.response && err.response.data.error) {
      failureCallback(err.response.data.error);
    } else {
      failureCallback('An Unknown error has occurred.');
    }
  });
};