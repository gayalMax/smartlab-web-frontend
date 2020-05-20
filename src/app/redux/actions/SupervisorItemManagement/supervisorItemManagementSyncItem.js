import axios from 'axios';
import * as yup from 'yup';

import {
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_BEGIN,
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_SUCCESS,
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_REQUEST_ITEM } from '../serverConstants';

/**
 * Action creator for beginning of requesting itemsets
 * @returns Redux action
 */
const SupervisorItemManagementSyncItemBegin = () => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_BEGIN
});

const SupervisorItemManagementSyncItemSuccess = items => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_SUCCESS,
  payload: { items }
});

const SupervisorItemManagementSyncItemFailure = error => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_FAILURE,
  payload: { error }
});

const responseSchema = yup.object().shape({
  id: yup.string().required(),
  reason: yup.string().required(),
  User: yup
    .object()
    .shape({
      email: yup.string().required()
    })
    .required(),
  Lab: yup
    .object()
    .shape({
      title: yup.string().required()
    })
    .required()
});

export default function SupervisorItemManagementSyncItem(requestToken) {
  return async dispatch => {
    dispatch(SupervisorItemManagementSyncItemBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(SupervisorItemManagementSyncItemFailure(message));
    }

    function onSuccess(success) {
      try {
        const items = responseSchema.validateSync(success.data);
        dispatch(SupervisorItemManagementSyncItemSuccess(items));
      } catch (err) {
        dispatch(
          SupervisorItemManagementSyncItemFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.get(`${SERVER}${SERVER_GET_REQUEST_ITEM}/${requestToken}`, {});

      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
