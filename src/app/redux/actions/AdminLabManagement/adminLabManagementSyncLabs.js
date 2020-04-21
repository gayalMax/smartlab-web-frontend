import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_LAB_MANAGEMENT_SYNC_LABS_BEGIN,
  ADMIN_LAB_MANAGEMENT_SYNC_LABS_SUCCESS,
  ADMIN_LAB_MANAGEMENT_SYNC_LABS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_LABS_ALL } from '../serverConstants';

/**
 * Action creator for beginning of requesting labs
 * @returns Redux action
 */
const adminLabManagementSyncLabsBegin = () => ({
  type: ADMIN_LAB_MANAGEMENT_SYNC_LABS_BEGIN
});

/**
 * Action creator for end of requesting labs.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.labs Labs list
 * @param {string} response.labs.id Id of the lab
 * @param {string} response.labs.title Title of the lab
 * @param {string} response.labs.subtitle Subtitle of the lab
 * @param {string} response.labs.image Image of the lab
 * @param {Date} response.labs.createdAt Created timestamp of the lab
 * @param {Date} response.labs.updatedAt Updated timestamp of the lab
 * @returns Redux action
 */
const adminLabManagementSyncLabsSuccess = ({ labs }) => ({
  type: ADMIN_LAB_MANAGEMENT_SYNC_LABS_SUCCESS,
  payload: { labs }
});

/**
 * Action creator for end of requesting labs.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminLabManagementSyncLabsFailure = error => ({
  type: ADMIN_LAB_MANAGEMENT_SYNC_LABS_FAILURE,
  payload: { error }
});

/**
 * User schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  labs: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      title: yup.string().required(),
      subtitle: yup.string().required(),
      image: yup.string().nullable(),
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
      Users: yup.array().of(
        yup.object().shape({
          email: yup.string().required(),
          firstName: yup.string().required(),
          lastName: yup.string().required()
        })
      )
    })
  )
});

/**
 * Request labs details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for lab sign in API call
 */
export default function adminLabManagementSyncLabs(token) {
  return async dispatch => {
    dispatch(adminLabManagementSyncLabsBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminLabManagementSyncLabsFailure(message));
    }

    function onSuccess(success) {
      // console.log('success', success);

      try {
        const { labs } = responseSchema.validateSync(success.data);
        dispatch(adminLabManagementSyncLabsSuccess({ labs }));
      } catch (err) {
        dispatch(
          adminLabManagementSyncLabsFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.get(`${SERVER}${SERVER_GET_LABS_ALL}`, { headers: { token } });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
