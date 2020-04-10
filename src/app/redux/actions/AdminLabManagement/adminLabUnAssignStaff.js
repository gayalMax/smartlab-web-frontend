import axios from 'axios';
import {
  ADMIN_LAB_MANAGEMENT_UNASSIGN_STAFF_BEGIN,
  ADMIN_LAB_MANAGEMENT_UNASSIGN_STAFF_SUCCESS,
  ADMIN_LAB_MANAGEMENT_UNASSIGN_STAFF_FAILURE
} from '../../actionTypes';
import { SERVER, SERVERE_UNASSIGN_STAFF } from '../serverConstants';
import adminLabManagementSyncLabs from './adminLabManagementSyncLabs';
/**
 * Action creator for beginning of creating labs
 * @returns Redux action
 */
const adminLabManagementUnassignStaffBegin = () => ({
  type: ADMIN_LAB_MANAGEMENT_UNASSIGN_STAFF_BEGIN
});

/**
 * Action creator for end of creating labs.
 * This is fired when API call ends in a success.
 * @returns Redux action
 */
const adminLabManagementUnassignStaffSuccess = success => ({
  type: ADMIN_LAB_MANAGEMENT_UNASSIGN_STAFF_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of creating labs.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminLabManagementUnassignStaffFailure = error => ({
  type: ADMIN_LAB_MANAGEMENT_UNASSIGN_STAFF_FAILURE,
  payload: { error }
});

/**
 * Request roles details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */

export default function adminLabManagementUnassignStaff(token, labId, userId) {
  return async dispatch => {
    dispatch(adminLabManagementUnassignStaffBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminLabManagementUnassignStaffFailure(message));
    }

    function onSuccess(success) {
      dispatch(adminLabManagementUnassignStaffSuccess(success));
      dispatch(adminLabManagementSyncLabs(token));
    }
    try {
      const success = await axios.post(
        `${SERVER}/${SERVERE_UNASSIGN_STAFF}`,
        { labId, userId },
        { headers: { token } }
      );
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess(`Lab Unassigned successfully!`);
    } catch (error) {
      onError(error.response);
    }
  };
}
