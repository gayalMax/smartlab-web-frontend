import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_REGISTRATION_SYNC_ROLES_BEGIN,
  ADMIN_REGISTRATION_SYNC_ROLES_SUCCESS,
  ADMIN_REGISTRATION_SYNC_ROLES_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_ROLES } from '../serverConstants';
import { capitalizeFirstLetter } from '../../../helpers/helpers';

/**
 * Action creator for beginning of requesting roles
 * @returns Redux action
 */
const adminRegistrationSyncRolesBegin = () => ({
  type: ADMIN_REGISTRATION_SYNC_ROLES_BEGIN
});

/**
 * Action creator for end of requesting roles.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.roles Roles list
 * @param {string} response.roles.id Id of the role
 * @param {string} response.roles.name Name of the role
 * @returns Redux action
 */
const adminRegistrationSyncRolesSuccess = ({ roles }) => ({
  type: ADMIN_REGISTRATION_SYNC_ROLES_SUCCESS,
  payload: { roles }
});

/**
 * Action creator for end of requesting roles.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminRegistrationSyncRolesFailure = error => ({
  type: ADMIN_REGISTRATION_SYNC_ROLES_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  roles: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required()
      })
    )
    .required()
});

/**
 * Request roles details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminRegistrationSyncRoles(token) {
  return async dispatch => {
    // API call initialized
    dispatch(adminRegistrationSyncRolesBegin());

    // Function to call if ended in error
    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminRegistrationSyncRolesFailure(message));
    }

    // Function to call if ended in success
    function onSuccess(success) {
      try {
        const validatedData = responseSchema.validateSync(success.data);
        const roles = validatedData.roles.map(role => {
          return { name: capitalizeFirstLetter(role.name), id: role.id };
        });
        dispatch(adminRegistrationSyncRolesSuccess({ roles }));
      } catch (err) {
        dispatch(
          adminRegistrationSyncRolesFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      // Make the get request
      const success = await axios.get(`${SERVER}${SERVER_GET_ROLES}`, { headers: { token } });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
