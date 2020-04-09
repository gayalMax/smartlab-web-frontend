import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_LAB_MANAGEMENT_SYNC_MANAGERS_BEGIN,
  ADMIN_LAB_MANAGEMENT_SYNC_MANAGERS_SUCCESS,
  ADMIN_LAB_MANAGEMENT_SYNC_MANAGERS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_MANAGERS_ALL } from '../serverConstants';

/**
 * Action creator for beginning of requesting managers
 * @returns Redux action
 */
const adminLabManagementSyncManagersBegin = () => ({
  type: ADMIN_LAB_MANAGEMENT_SYNC_MANAGERS_BEGIN
});

/**
 * Action creator for end of requesting managers.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.managers Managers list
 * @param {string} response.managers.id Id of the user
 * @param {string} response.managers.firstName First Name of the user
 * @param {string} response.managers.lastName Last Name of the user
 * @param {string} response.managers.email Email of the user
 * @returns Redux action
 */
const adminLabManagementSyncManagersSuccess = ({ managers }) => ({
  type: ADMIN_LAB_MANAGEMENT_SYNC_MANAGERS_SUCCESS,
  payload: { managers }
});

/**
 * Action creator for end of requesting managers.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminLabManagementSyncManagersFailure = error => ({
  type: ADMIN_LAB_MANAGEMENT_SYNC_MANAGERS_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  managers: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().required()
      })
    )
    .required()
});

/**
 * Request managers details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for lab sign in API call
 */
export default function adminLabManagementSyncManagers(token) {
  return async dispatch => {
    dispatch(adminLabManagementSyncManagersBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminLabManagementSyncManagersFailure(message));
    }

    function onSuccess(success) {
      try {
        const { managers } = responseSchema.validateSync({
          managers: success.data.inventoryManagers
        });
        dispatch(adminLabManagementSyncManagersSuccess({ managers }));
      } catch (err) {
        dispatch(
          adminLabManagementSyncManagersFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.get(`${SERVER}/${SERVER_GET_MANAGERS_ALL}`, {
        headers: { token }
      });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
