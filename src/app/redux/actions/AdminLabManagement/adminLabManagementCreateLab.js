import axios from 'axios';
import {
  ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN,
  ADMIN_LABMANAGEMENT_CREATE_LAB_SUCCESS,
  ADMIN_LABMANAGEMENT_CREATE_LAB_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_CREATE_LAB } from '../serverConstants';

/**
 * Action creator for beginning of creating labs
 * @returns Redux action
 */
const adminAdministrationCreateLabBegin = () => ({
  type: ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN
});

/**
 * Action creator for end of creating labs.
 * This is fired when API call ends in a success.
 * @returns Redux action
 */
const adminAdministrationCreateLabSuccess = success => ({
  type: ADMIN_LABMANAGEMENT_CREATE_LAB_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of creating labs.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminAdministrationCreateLabFailure = error => ({
  type: ADMIN_LABMANAGEMENT_CREATE_LAB_FAILURE,
  payload: { error }
});

/**
 * Request roles details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */

export default function adminLabManagementCreateLab(token, title, subTitle, imageID, complete) {
  return async dispatch => {
    dispatch(adminAdministrationCreateLabBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      console.log("error detected",message)
      dispatch(adminAdministrationCreateLabFailure(message));
    }

    function onSuccess(success) {
      console.log("success detected",success)
      dispatch(adminAdministrationCreateLabSuccess(success));
    }
    try {
      const success = await axios.post(
        `${SERVER}/${SERVER_CREATE_LAB}`,
        { title, subtitle: subTitle, imageID },
        { headers: { token } }
      );
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess(`Lab ${title} created successfully!`);
      complete();
    } catch (error) {
      onError(error.response);
      // complete();
    }
  };
}
