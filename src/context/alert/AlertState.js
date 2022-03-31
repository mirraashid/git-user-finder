import React, { useState } from 'react';
import AlertContext from './alertContext';

const AlertState = props => {

  const initialState = null;
  const [alertData, setAlertData] = useState(initialState);

  const setAlert = (msg, type) => {
    setAlertData({msg, type})
  };

  const removeAlert = () => {
    setAlertData(initialState)
  } 

  return (
    <AlertContext.Provider
      value={{
        alert: alertData,
        setAlert,
        removeAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
