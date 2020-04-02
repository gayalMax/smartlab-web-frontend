import axios from 'axios';
import * as yup from 'yup';

import {
  AUTH_REQUEST_INVITATION_BEGIN,
  AUTH_REQUEST_INVITATION_SUCCESS,
  AUTH_REQUEST_INVITATION_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_REQUEST_INVITATION } from '../serverConstants';

/**
 * Action creator for beginning of requesting invitation details
 * @param {string} invitationToken Invitation token key
 * @returns Redux action
 */
const authRequestInvitationBegin = () => ({
  type: AUTH_REQUEST_INVITATION_BEGIN
});

/**
 * Action creator for end of requesting invitation details.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {string} response.email Email of the associated user
 * @param {string} response.roleId Id of the assigned role
 * @param {Object} response.role Info about assigned role
 * @param {string} response.role.name Name of the assigned role
 * @returns Redux action
 */
const authRequestInvitationSuccess = ({ email, roleId, Role }) => ({
  type: AUTH_REQUEST_INVITATION_SUCCESS,
  payload: { email, roleId, Role }
});

/**
 * Action creator for end of requesting invitation details.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const authRequestInvitationFailure = error => ({
  type: AUTH_REQUEST_INVITATION_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  roleId: yup.string().required(),
  Role: yup.object().shape({
    name: yup.string().required()
  })
});

/**
 * Request invitation details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @param {Object} invitationToken Invitation Token of user
 * @returns Thunk for user sign in API call
 */
export default function authRequestInvitation(invitationToken) {
  return async dispatch => {
    // API call initialized
    dispatch(authRequestInvitationBegin());

    // Function to call if ended in error
    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(authRequestInvitationFailure(message));
    }

    // Function to call if ended in success
    function onSuccess(success) {
      try {
        const validatedData = responseSchema.validateSync(success.data);
        dispatch(authRequestInvitationSuccess(validatedData));
      } catch (err) {
        dispatch(
          authRequestInvitationFailure('Server connection failed. Please check your connection.')
        );
      }
    }

    try {
      // Make the get request
      const success = await axios.get(`${SERVER}/${SERVER_REQUEST_INVITATION}/${invitationToken}`);
      console.log(`${SERVER}/${SERVER_REQUEST_INVITATION}/${invitationToken}`);
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
