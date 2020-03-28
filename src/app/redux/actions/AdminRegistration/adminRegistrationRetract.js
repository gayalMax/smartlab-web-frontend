import axios from 'axios';
import {
  ADMIN_REGISTRATION_RETRACTION_BEGIN,
  ADMIN_REGISTRATION_RETRACTION_SUCCESS,
  ADMIN_REGISTRATION_RETRACTION_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_DELETE_TOKENS } from '../serverConstants';
import adminRegistrationSyncTokens from './adminRegistrationSyncTokens';

/**
 * Action creator for beginning of retraction
 * @returns Redux action
 */
const adminRegistrationRetractBegin = () => ({
  type: ADMIN_REGISTRATION_RETRACTION_BEGIN
});

/**
 * Action creator for end of retraction.
 * This is fired when API call ends in a success.
 * @returns Redux action
 */
const adminRegistrationRetractSuccess = () => ({
  type: ADMIN_REGISTRATION_RETRACTION_SUCCESS
});

/**
 * Action creator for end of retraction.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminRegistrationRetractFailure = error => ({
  type: ADMIN_REGISTRATION_RETRACTION_FAILURE,
  payload: { error }
});

/**
 * Request retraction thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminRegistrationRetract(token, email) {
  return async dispatch => {
    dispatch(adminRegistrationRetractBegin());

    if (!email) {
      dispatch(adminRegistrationRetractFailure('No email addresses submitted'));
      return;
    }

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminRegistrationRetractFailure(message));
    }

    function onSuccess() {
      try {
        dispatch(adminRegistrationRetractSuccess());
        dispatch(adminRegistrationSyncTokens(token));
      } catch (err) {
        dispatch(
          adminRegistrationRetractFailure('Server connection failed. Please check your connection.')
        );
      }
    }

    try {
      const success = await axios.delete(`${SERVER}/${SERVER_DELETE_TOKENS}`, {
        data: { email },
        headers: { token }
      });
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess();
    } catch (error) {
      onError(error.response);
    }
  };
}
