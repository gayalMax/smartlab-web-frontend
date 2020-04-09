import axios from 'axios';
import * as yup from 'yup';

import { AUTH_SIGN_IN_BEGIN, AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_IN_FAILURE } from '../../actionTypes';
import { SERVER, SERVER_SIGN_IN, ROLE_STUDENT } from '../serverConstants';

/**
 * Action creator for beginning of user sign in API call
 * @returns Redux action
 */
const authSignInBegin = () => ({
  type: AUTH_SIGN_IN_BEGIN
});

/**
 * Action creator for end of user sign in API call.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object} response.user User details object
 * @param {string} response.token Token for user authentication
 * @returns Redux action
 */
const authSignInSuccess = ({ user, token }) => ({
  type: AUTH_SIGN_IN_SUCCESS,
  payload: { user, token }
});

/**
 * Action creator for end of user sign in API call.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const authSignInFailure = error => ({
  type: AUTH_SIGN_IN_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  token: yup.string().required(),
  user: yup.object().shape({
    id: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    permissions: yup.array().of(yup.string()),
    role: yup.string().required(),
    roleId: yup.string().required()
  })
});

/**
 * User sign in thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @param {Object} authData Email and password object of the user
 * @param {string} authData.email Email of the user
 * @param {string} authData.password Password of the user
 * @param {*} complete Function callback to signify that the async call is stopped
 * @returns Thunk for user sign in API call
 */
export default function authSignIn({ email, password }, complete) {
  return async dispatch => {
    // API call initialized
    dispatch(authSignInBegin());

    // Function to call if ended in error
    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(authSignInFailure(message));
    }

    // Function to call if ended in success
    function onSuccess(success) {
      try {
        const validatedData = responseSchema.validateSync(success.data);
        // Students can't access this portal
        if (validatedData.user.role === ROLE_STUDENT) {
          dispatch(authSignInFailure('You are not authorized.'));
        } else {
          dispatch(authSignInSuccess(validatedData));
        }
      } catch (err) {
        dispatch(authSignInFailure('Server connection failed. Please check your connection.'));
      }
    }

    try {
      // Make the post request
      const success = await axios.post(`${SERVER}${SERVER_SIGN_IN}`, { email, password });
      complete();
      onSuccess(success);
    } catch (error) {
      complete();
      onError(error.response);
    }
  };
}
