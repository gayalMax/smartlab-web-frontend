import axios from 'axios';

import { AUTH_SIGN_UP_BEGIN, AUTH_SIGN_UP_SUCCESS, AUTH_SIGN_UP_FAILURE } from '../../actionTypes';
import { SERVER, SERVER_SIGN_UP } from '../serverConstants';

/**
 * Action creator for beginning of user sign up API call
 * @returns Redux action
 */
const authSignUpBegin = () => ({
  type: AUTH_SIGN_UP_BEGIN
});

/**
 * Action creator for end of user sign up API call.
 * This is fired when API call ends in a success.
 * @returns Redux action
 */
const authSignUpSuccess = () => ({
  type: AUTH_SIGN_UP_SUCCESS
});

/**
 * Action creator for end of user sign in API call.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const authSignUpFailure = error => ({
  type: AUTH_SIGN_UP_FAILURE,
  payload: { error }
});

/**
 * User sign up thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @param {Object} regData Registration data
 * @param {string} regData.token Registration token of the user
 * @param {string} regData.firstName First Name of the user
 * @param {string} regData.lastName Last Name of the user
 * @param {string} regData.password Password of the user
 * @param {*} complete Function callback to signify that the async call is stopped
 * @returns Thunk for user sign in API call
 */
export default function authSignUp({ token, email, firstName, lastName, password }, complete) {
  return async dispatch => {
    // API call initialized
    dispatch(authSignUpBegin());

    // Function to call if ended in error
    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(authSignUpFailure(message));
    }

    // Function to call if ended in success
    function onSuccess() {
      dispatch(authSignUpSuccess());
    }

    try {
      // Make the post request
      await axios.post(`${SERVER}${SERVER_SIGN_UP}`, {
        token,
        email,
        firstName,
        lastName,
        password
      });
      complete();
      onSuccess();
    } catch (error) {
      complete();
      onError(error.response);
    }
  };
}
