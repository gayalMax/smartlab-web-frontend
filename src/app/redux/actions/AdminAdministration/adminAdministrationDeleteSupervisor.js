import axios from 'axios';
import {
  ADMIN_ADMINISTRATION_DELETE_SUPERVISOR_BEGIN,
  ADMIN_ADMINISTRATION_DELETE_SUPERVISOR_SUCCESS,
  ADMIN_ADMINISTRATION_DELETE_SUPERVISOR_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_DELETE_SUPERVISOR } from '../serverConstants';
import adminAdministrationSyncSupervisors from './adminAdministrationSyncSupervisors';

/**
 * Action creator for beginning of deleting roles
 * @returns Redux action
 */
const adminAdministrationDeleteSupervisorBegin = () => ({
  type: ADMIN_ADMINISTRATION_DELETE_SUPERVISOR_BEGIN
});

/**
 * Action creator for end of deleting roles.
 * This is fired when API call ends in a success.
 * @returns Redux action
 */
const adminAdministrationDeleteSupervisorSuccess = success => ({
  type: ADMIN_ADMINISTRATION_DELETE_SUPERVISOR_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of deleting roles.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminAdministrationDeleteSupervisorFailure = error => ({
  type: ADMIN_ADMINISTRATION_DELETE_SUPERVISOR_FAILURE,
  payload: { error }
});

/**
 * Request roles details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminAdministrationDeleteSupervisor(token, { id, name }) {
  return async dispatch => {
    dispatch(adminAdministrationDeleteSupervisorBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminAdministrationDeleteSupervisorFailure(message));
    }

    function onSuccess(success) {
      dispatch(adminAdministrationDeleteSupervisorSuccess(success));
      dispatch(adminAdministrationSyncSupervisors(token));
    }

    try {
      const success = await axios.delete(`${SERVER}${SERVER_DELETE_SUPERVISOR}/${id}`, {
        headers: { token }
      });
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess(`Supervisor '${name}' deleted successfully.`);
    } catch (error) {
      onError(error.response);
    }
  };
}
