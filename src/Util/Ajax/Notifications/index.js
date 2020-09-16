import axios from 'axios';

export const getNotifications = (successCallback) => {
  axios.get('/notifications')
    .then((res) => {
      successCallback(res.data.notifications);
    }).catch((err) => {
      console.log(err);
    });
};
