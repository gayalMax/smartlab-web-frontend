import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_BEGIN,
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_PERMISSIONS } from '../serverConstants';

/**
 * Action creator for beginning of requesting permissions
 * @param {string} invitationToken Invitation token key
 * @returns Redux action
 */
const adminAdministrationSyncPermissionsBegin = () => ({
  type: ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_BEGIN
});

/**
 * Action creator for end of requesting permissions.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {string[]} response.permissions Permissions list
 * @returns Redux action
 */
const adminAdministrationSyncPermissionsSuccess = ({ permissions }) => ({
  type: ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS,
  payload: permissions
});

/**
 * Action creator for end of requesting permissions.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminAdministrationSyncPermissionsFailure = error => ({
  type: ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  permissions: yup
    .array()
    .of(yup.string())
    .required()
});

/**
 * Request permissions thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for request permission API call
 */
export default function adminAdministrationSyncPermissions(token) {
  return async dispatch => {
    dispatch(adminAdministrationSyncPermissionsBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminAdministrationSyncPermissionsFailure(message));
    }

    function onSuccess(success) {
      try {
        const permissions = responseSchema.validateSync(success.data);
        dispatch(adminAdministrationSyncPermissionsSuccess({ permissions }));
      } catch (err) {
        dispatch(
          adminAdministrationSyncPermissionsFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      // Make the get request
      const success = await axios.get(`${SERVER}${SERVER_GET_PERMISSIONS}`, {
        headers: { token }
      });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
