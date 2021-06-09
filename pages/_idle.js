import React from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import * as UserAction from 'store/actions/user';

const IdleLogout = ({timeout}) => {

  const dispatch = useDispatch();
  const handleIdle = () => {
    const idleTime = getTotalIdleTime();
    console.log(idleTime);
    dispatch(UserAction.logout());
  };
  
  const { getTotalIdleTime } = useIdleTimer({
    debounce: 250,
    crossTab: true,
    timeout: timeout,
    onIdle: handleIdle
  });
  
  return null;
}

export default IdleLogout
