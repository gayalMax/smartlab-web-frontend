import axios from 'axios';
import {
  ADMIN_ADMINISTRATION_CREATE_SUPERVISOR_BEGIN,
  ADMIN_ADMINISTRATION_CREATE_SUPERVISOR_SUCCESS,
  ADMIN_ADMINISTRATION_CREATE_SUPERVISOR_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_CREATE_SUPERVISOR } from '../serverConstants';

/**
 * Action creator for beginning of creating roles
 * @returns Redux action
 */
const adminAdministrationCreateSupervisorBegin = () => ({
  type: ADMIN_ADMINISTRATION_CREATE_SUPERVISOR_BEGIN
});

/**
 * Action creator for end of creating roles.
 * This is fired when API call ends in a success.
 * @returns Redux action
 */
const adminAdministrationCreateSupervisorSuccess = success => ({
  type: ADMIN_ADMINISTRATION_CREATE_SUPERVISOR_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of creating roles.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminAdministrationCreateSupervisorFailure = error => ({
  type: ADMIN_ADMINISTRATION_CREATE_SUPERVISOR_FAILURE,
  payload: { error }
});

/**
 * Request roles details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminAdministrationCreateSupervisor(
  token,
  firstName,
  lastName,
  email,
  complete
) {
  return async dispatch => {
    dispatch(adminAdministrationCreateSupervisorBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminAdministrationCreateSupervisorFailure(message));
    }

    function onSuccess(success) {
      dispatch(adminAdministrationCreateSupervisorSuccess(success));
    }

    try {
      const success = await axios.post(
        `${SERVER}${SERVER_CREATE_SUPERVISOR}`,
        { firstName, lastName, email },
        { headers: { token } }
      );
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess(`Supervisor '${firstName} ${lastName}' created successfully.`);
      complete();
    } catch (error) {
      onError(error.response);
      complete();
    }
  };
}
