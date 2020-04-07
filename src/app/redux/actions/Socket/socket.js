import io from 'socket.io-client';
import { SERVER } from '../serverConstants';
import {
  SOCKET_START_ON_CONNECT,
  SOCKET_START_ON_DISCONNECT,
  SOCKET_START_ON_DEVICE_MESSAGE,
  SOCKET_START_ON_DEVICE_CONNECT,
  SOCKET_START_ON_DEVICE_DISCONNECT,
  SOCKET_START_BEGIN
} from '../../actionTypes';

const socketStartBegin = () => ({
  type: SOCKET_START_BEGIN
});

const socketStartOnConnect = () => ({
  type: SOCKET_START_ON_CONNECT
});

const socketStartOnDisconnect = () => ({
  type: SOCKET_START_ON_DISCONNECT
});

const socketStartOnDeviceMessage = data => ({
  type: SOCKET_START_ON_DEVICE_MESSAGE,
  payload: data
});

const socketStartOnDeviceConnect = data => ({
  type: SOCKET_START_ON_DEVICE_CONNECT,
  payload: data
});

const socketStartOnDeviceDisconnect = data => ({
  type: SOCKET_START_ON_DEVICE_DISCONNECT,
  payload: data
});

let socket;

const socketStart = token => {
  return async dispatch => {
    if (socket) {
      try {
        socket.disconnect();
      } catch (err) {
        // Ignore
      }
    }

    dispatch(socketStartBegin());

    socket = io(`${SERVER}/staff`, {
      query: {
        client: 'web',
        token
      }
    });

    const handleEvent = ({ type, client, data, timestamp }) => {
      if (client !== 'mobile') return;

      if (type === 'connect') {
        dispatch(socketStartOnDeviceConnect({ timestamp }));
      } else if (type === 'disconnect') {
        dispatch(socketStartOnDeviceDisconnect({ timestamp }));
      } else if (type === 'message') {
        dispatch(socketStartOnDeviceMessage({ data, timestamp }));
      }
    };

    socket.on('connect', () => dispatch(socketStartOnConnect()));
    socket.on('server#message', handleEvent);
    socket.on('disconnect', () => dispatch(socketStartOnDisconnect()));
  };
};

const socketEnd = () => {
  return async () => {
    if (socket) {
      try {
        socket.disconnect();
      } catch (err) {
        // Ignore
      }
    }
  };
};

export { socketStart, socketEnd };
