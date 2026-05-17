import { useState } from "react";

const useNotification = () => {

  const [notification, setNotification] =
    useState({
      show: false,
      message: '',
      type: ''
    });

  const showSuccess = (message) => {

    setNotification({
      show: true,
      message,
      type: 'success'
    });

  };

  const showError = (message) => {

    setNotification({
      show: true,
      message,
      type: 'error'
    });

  };

  const showWarning = (message) => {

    setNotification({
      show: true,
      message,
      type: 'warning'
    });

  };

  const hideNotification = () => {

    setNotification(prev => ({
      ...prev,
      show: false
    }));

  };

  return {

    notification,

    setNotification,

    showSuccess,
    showError,
    showWarning,

    hideNotification

  };

};

export default useNotification;