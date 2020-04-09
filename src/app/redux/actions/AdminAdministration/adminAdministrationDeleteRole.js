import axios from 'axios';
import {
  ADMIN_ADMINISTRATION_DELETE_ROLE_BEGIN,
  ADMIN_ADMINISTRATION_DELETE_ROLE_SUCCESS,
  ADMIN_ADMINISTRATION_DELETE_ROLE_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_DELETE_ROLE } from '../serverConstants';
import adminAdministrationSyncRoles from './adminAdministrationSyncRoles';

/**
 * Action creator for beginning of deleting roles
 * @returns Redux action
 */
const adminAdministrationDeleteRoleBegin = () => ({
  type: ADMIN_ADMINISTRATION_DELETE_ROLE_BEGIN
});

/**
 * Action creator for end of deleting roles.
 * This is fired when API call ends in a success.
 * @returns Redux action
 */
const adminAdministrationDeleteRoleSuccess = success => ({
  type: ADMIN_ADMINISTRATION_DELETE_ROLE_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of deleting roles.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminAdministrationDeleteRoleFailure = error => ({
  type: ADMIN_ADMINISTRATION_DELETE_ROLE_FAILURE,
  payload: { error }
});

/**
 * Request roles details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminAdministrationDeleteRole(token, { id, name }) {
  return async dispatch => {
    dispatch(adminAdministrationDeleteRoleBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminAdministrationDeleteRoleFailure(message));
    }

    function onSuccess(success) {
      dispatch(adminAdministrationDeleteRoleSuccess(success));
      dispatch(adminAdministrationSyncRoles());
    }

    try {
      const success = await axios.delete(`${SERVER}${SERVER_DELETE_ROLE}/${id}`, {
        headers: { token }
      });
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess(`Role '${name}' deleted successfully.`);
    } catch (error) {
      onError(error.response);
    }
  };
}
