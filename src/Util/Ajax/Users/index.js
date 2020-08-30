import axios from 'axios';

export const signIn = (data, successCallback, failureCallback) => {
  axios.post(
    '/users/sign_in', {
      user: data,
    }
  ).then((res) => {
    successCallback(res.data, res.headers.authorization);
  }).catch((err) => {
    if (err.response) {
      failureCallback(err.response.data.error);
    } else {
      failureCallback('An unknown error has occurred.');
    }
  });
};

export const signUp = (data, successfulCallback, failureCallback) => {
  axios.post(
    '/users/sign_up', {
      user: data,
    }
  ).then((res) => {
    successfulCallback(res.data, res.headers.authorization);
  }).catch((err) => {
    if (err.response) {
      failureCallback(err.response.data.error);
    } else {
      failureCallback('An Unknown error has occured.');
    }
  });
};