import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_ADMINISTRATION_SYNC_USERS_BEGIN,
  ADMIN_ADMINISTRATION_SYNC_USERS_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_USERS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_USERS_ALL } from '../serverConstants';

/**
 * Action creator for beginning of requesting users
 * @returns Redux action
 */
const adminAdministrationSyncUsersBegin = () => ({
  type: ADMIN_ADMINISTRATION_SYNC_USERS_BEGIN
});

/**
 * Action creator for end of requesting users.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.users Users list
 * @param {string} response.users.id Id of the user
 * @param {string} response.users.firstName First Name of the user
 * @param {string} response.users.lastName Last Name of the user
 * @param {string} response.users.email Email of the user
 * @param {string} response.users.roleId Role ID of the user
 * @param {Object[]} response.users.Role Role of user
 * @param {string} response.users.Role.name Name of the role
 * @returns Redux action
 */
const adminAdministrationSyncUsersSuccess = ({ users }) => ({
  type: ADMIN_ADMINISTRATION_SYNC_USERS_SUCCESS,
  payload: { users }
});

/**
 * Action creator for end of requesting users.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminAdministrationSyncUsersFailure = error => ({
  type: ADMIN_ADMINISTRATION_SYNC_USERS_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  users: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup
          .string()
          .email()
          .required(),
        roleId: yup.string().required(),
        Role: yup
          .object()
          .shape({
            name: yup.string().required()
          })
          .required()
      })
    )
    .required()
});

/**
 * Request users details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminAdministrationSyncUsers(token) {
  return async dispatch => {
    dispatch(adminAdministrationSyncUsersBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminAdministrationSyncUsersFailure(message));
    }

    function onSuccess(success) {
      try {
        const { users } = responseSchema.validateSync(success.data);
        dispatch(adminAdministrationSyncUsersSuccess({ users }));
      } catch (err) {
        dispatch(
          adminAdministrationSyncUsersFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.get(`${SERVER}${SERVER_GET_USERS_ALL}`, { headers: { token } });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
