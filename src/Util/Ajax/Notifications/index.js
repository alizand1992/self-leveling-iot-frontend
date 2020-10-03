import axios from 'axios';

export const getNotifications = (successCallback) => {
  axios.get('/notifications')
    .then((res) => {
      successCallback(res.data.notifications);
    }).catch((err) => {
      console.log(err);
    });
};

export const saveNotification = (data, successCallback) => {
  axios.post(
    '/notifications',
    data
  ).then(() => {
    successCallback();
  }).catch((err) => {
    console.log({ err });
  });
};

export const getNotificationData = (id, successCallback, cancelToken) => {
  axios.get(
    `/notifications/${id}`, {
      cancelToken: cancelToken.token,
    }).then((res) => {
    successCallback(res.data.notification);
  }).catch((err) => {
    console.log(err);
  });
};

export const updateNotification = (data, successCallback) => {
  axios.put(
    `/notifications/${data.id}`,
    {
      ...data,
    }
  )
    .then((res) => {
      successCallback(res.data);
    }).catch((err) => {
      console.log(err);
    });
};
