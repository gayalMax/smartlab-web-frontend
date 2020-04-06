import axios from 'axios';
import {
  ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN,
  ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS,
  ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_CREATE_ROLE } from '../serverConstants';

/**
 * Action creator for beginning of creating roles
 * @returns Redux action
 */
const adminAdministrationCreateRoleBegin = () => ({
  type: ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN
});

/**
 * Action creator for end of creating roles.
 * This is fired when API call ends in a success.
 * @returns Redux action
 */
const adminAdministrationCreateRoleSuccess = success => ({
  type: ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of creating roles.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminAdministrationCreateRoleFailure = error => ({
  type: ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE,
  payload: { error }
});

/**
 * Request roles details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminAdministrationCreateRole(token, roleName, permissions, complete) {
  return async dispatch => {
    dispatch(adminAdministrationCreateRoleBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminAdministrationCreateRoleFailure(message));
    }

    function onSuccess(success) {
      dispatch(adminAdministrationCreateRoleSuccess(success));
    }

    try {
      const success = await axios.post(
        `${SERVER}/${SERVER_CREATE_ROLE}`,
        { name: roleName, permissions },
        { headers: { token } }
      );
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess(`Role '${roleName}' created successfully.`);
      complete();
    } catch (error) {
      onError(error.response);
      complete();
    }
  };
}
