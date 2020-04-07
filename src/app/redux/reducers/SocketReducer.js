import produce from 'immer';

import {
  SOCKET_START_BEGIN,
  SOCKET_START_ON_CONNECT,
  SOCKET_START_ON_DISCONNECT,
  SOCKET_START_ON_DEVICE_MESSAGE
} from '../actionTypes';
import initialState from '../states/socketState';

const socketReducer = produce((draft, { type, payload }) => {
  // Draft is null initially
  if (!draft) {
    return initialState;
  }

  switch (type) {
    case SOCKET_START_BEGIN:
      draft.lastEvent = null;
      draft.showOverlay = true;
      draft.connected = false;
      return draft;
    case SOCKET_START_ON_CONNECT:
      draft.connected = true;
      return draft;
    case SOCKET_START_ON_DISCONNECT:
      draft.connected = false;
      draft.lastEvent = null;
      draft.showOverlay = false;
      return draft;
    case SOCKET_START_ON_DEVICE_MESSAGE:
      draft.lastEvent = payload;
      return draft;
    default:
      return draft;
  }
});

export { socketReducer, initialState };
