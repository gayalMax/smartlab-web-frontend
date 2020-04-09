import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_REGISTRATION_SYNC_TOKENS_BEGIN,
  ADMIN_REGISTRATION_SYNC_TOKENS_SUCCESS,
  ADMIN_REGISTRATION_SYNC_TOKENS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_TOKENS } from '../serverConstants';
import { capitalizeFirstLetter } from '../../../helpers/helpers';

/**
 * Action creator for beginning of requesting tokens
 * @param {string} invitationToken Invitation token key
 * @returns Redux action
 */
const adminRegistrationSyncTokensBegin = () => ({
  type: ADMIN_REGISTRATION_SYNC_TOKENS_BEGIN
});

/**
 * Action creator for end of requesting tokens.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.tokens Tokens list
 * @param {string} response.tokens.email Email
 * @param {string} response.tokens.valid Whether token is valid
 * @param {string} response.tokens.updatedAt Whether token is updated
 * @param {Object} response.tokens.Role Role information
 * @param {string} response.tokens.Role.id Role ID
 * @param {string} response.tokens.Role.name Role name
 * @returns Redux action
 */
const adminRegistrationSyncTokensSuccess = ({ tokens }) => ({
  type: ADMIN_REGISTRATION_SYNC_TOKENS_SUCCESS,
  payload: tokens
});

/**
 * Action creator for end of requesting tokens.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminRegistrationSyncTokensFailure = error => ({
  type: ADMIN_REGISTRATION_SYNC_TOKENS_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  tokens: yup
    .array()
    .of(
      yup.object().shape({
        email: yup
          .string()
          .email()
          .required(),
        valid: yup.bool().required(),
        updatedAt: yup.date().required(),
        Role: yup.object().shape({
          id: yup.string().required(),
          name: yup.string().required()
        })
      })
    )
    .required()
});

/**
 * Request tokens details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminRegistrationSyncTokens(token) {
  return async dispatch => {
    // API call initialized
    dispatch(adminRegistrationSyncTokensBegin());

    // Function to call if ended in error
    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminRegistrationSyncTokensFailure(message));
    }

    // Function to call if ended in success
    function onSuccess(success) {
      try {
        const validatedData = responseSchema.validateSync(success.data);
        validatedData.tokens.forEach(t => {
          // eslint-disable-next-line no-param-reassign
          t.Role.name = capitalizeFirstLetter(t.Role.name);
        });
        dispatch(adminRegistrationSyncTokensSuccess({ tokens: validatedData }));
      } catch (err) {
        dispatch(
          adminRegistrationSyncTokensFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      // Make the get request
      const success = await axios.get(`${SERVER}${SERVER_GET_TOKENS}`, { headers: { token } });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
