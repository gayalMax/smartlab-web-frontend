import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_ADMINISTRATION_SYNC_SUPERVISORS_BEGIN,
  ADMIN_ADMINISTRATION_SYNC_SUPERVISORS_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_SUPERVISORS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_SUPERVISORS } from '../serverConstants';

/**
 * Action creator for beginning of requesting supervisors
 * @returns Redux action
 */
const adminAdministrationSyncSupervisorsBegin = () => ({
  type: ADMIN_ADMINISTRATION_SYNC_SUPERVISORS_BEGIN
});

/**
 * Action creator for end of requesting supervisors.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.supervisors Supervisors list
 * @param {string} response.supervisors.id Id of the supervisor
 * @param {string} response.supervisors.firstName First Name of the supervisor
 * @param {string} response.supervisors.lastName Last Name of the supervisor
 * @param {string} response.supervisors.email Email of the supervisor
 * @returns Redux action
 */
const adminAdministrationSyncSupervisorsSuccess = ({ supervisors }) => ({
  type: ADMIN_ADMINISTRATION_SYNC_SUPERVISORS_SUCCESS,
  payload: { supervisors }
});

/**
 * Action creator for end of requesting supervisors.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminAdministrationSyncSupervisorsFailure = error => ({
  type: ADMIN_ADMINISTRATION_SYNC_SUPERVISORS_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  supervisors: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup
        .string()
        .email()
        .required()
    })
  )
});

/**
 * Request supervisors details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for supervisor sign in API call
 */
export default function adminAdministrationSyncSupervisors(token) {
  return async dispatch => {
    dispatch(adminAdministrationSyncSupervisorsBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminAdministrationSyncSupervisorsFailure(message));
    }

    function onSuccess(success) {
      try {
        const { supervisors } = responseSchema.validateSync(success.data);
        dispatch(adminAdministrationSyncSupervisorsSuccess({ supervisors }));
      } catch (err) {
        dispatch(
          adminAdministrationSyncSupervisorsFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.get(`${SERVER}${SERVER_GET_SUPERVISORS}`, {
        headers: { token }
      });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
