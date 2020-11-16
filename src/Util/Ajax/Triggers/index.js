import axios from 'axios';

export const getTriggersForNotification = (notification_id, successCallback, cancelToken) => {
  axios.get(
    `/triggers?notification_id=${notification_id}`, {
      cancelToken: cancelToken.token,
    }
  ).then((res) => {
    successCallback(res.data.triggers);
  }).catch((err) => {
    console.log(err);
  });
};

export const getTriggerAttributes = (successCallback, cancelToken) => {
  axios.get(
    '/triggers/attributes', {
      cancelToken: cancelToken.token,
    }
  ).then((res) => {
    successCallback(res.data.attributes);
  }).catch((err) => {
    console.log(err);
  });
};

export const saveTrigger = (data, successCallback) => {
  axios.post(
    '/triggers/',
    data
  ).then((res) => {
    console.log(res);
    successCallback();
  }).catch((err) => {
    console.log(err);
  });
};

export const updateTrigger = (data, successCallback) => {
  axios.put(
    `/triggers/${data.id}`,
    data
  ).then((res) => {
    console.log(res);
    successCallback();
  }).catch((err) => {
    console.log(err);
  });
};

export const deleteTrigger = (data, successCallback) => {
  axios.delete(`/triggers/${data.id}?notification_id=${data.notificationId}`,)
    .then((res) => {
      console.log(res);
      successCallback();
    }).catch((err) => {
      console.log(err);
    });
};
