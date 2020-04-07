import axios from 'axios';
import {
  ADMIN_LABMANAGEMENT_SYNC_LAB_BEGIN,
  ADMIN_LABMANAGEMENT_SYNC_LAB_SUCCESS,
  ADMIN_LABMANAGEMENT_SYNC_LAB_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_SYNC_LAB } from '../serverConstants';

const adminLabManagementLabSyncBegin = () => ({
  type: ADMIN_LABMANAGEMENT_SYNC_LAB_BEGIN
});

const adminLabManagementLabSyncSuccess = success => ({
  type: ADMIN_LABMANAGEMENT_SYNC_LAB_SUCCESS,
  payload: { success }
});

const adminLabManagementLabSyncError = error => ({
  type: ADMIN_LABMANAGEMENT_SYNC_LAB_FAILURE,
  payload: { error }
});

export default function adminLabManagementLabSync(token, complete) {
  return async dispatch => {
    dispatch(adminLabManagementLabSyncBegin());

    function onSuccess(success) {
      dispatch(adminLabManagementLabSyncSuccess(success));
    }

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminLabManagementLabSyncError(message));
    }

    try {
      const success = await axios.get(`${SERVER}/${SERVER_SYNC_LAB}`, {}, { headers: { token } });
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess('labs synced succcessfully!');
      complete();
    } catch (error) {
      onError(error.response);
      complete();
    }
  };
}
