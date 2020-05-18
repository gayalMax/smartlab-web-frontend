import axios from 'axios';

import {
  SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_BEGIN,
  SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_FAILURE,
  SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_SUCCESS
} from '../../actionTypes';
import { SERVER, SERVER_ACCEPT_REQUEST_ITEM } from '../serverConstants';

/**
 * Action creator for beginning of requesting itemsets
 * @returns Redux action
 */
const SupervisorItemManagementRejectRequestBegin = () => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_BEGIN
});

const SupervisorItemManagementRejectRequestSuccess = success => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_SUCCESS,
  payload: { success }
});

const SupervisorItemManagementRejectRequestFailure = error => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_FAILURE,
  payload: { error }
});

export default function SupervisorItemManagementAcceptRequest(
  requestToken,
  rejectValue,
  reason,
  complete
) {
  return async dispatch => {
    dispatch(SupervisorItemManagementRejectRequestBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(SupervisorItemManagementRejectRequestFailure(message));
    }

    function onSuccess() {
      try {
        dispatch(SupervisorItemManagementRejectRequestSuccess('Succesfully rejected the request'));
      } catch (err) {
        dispatch(
          SupervisorItemManagementRejectRequestFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.post(`${SERVER}${SERVER_ACCEPT_REQUEST_ITEM}`, {
        requestToken,
        rejectValue,
        reason
      });
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }
      onSuccess();
      complete();
    } catch (error) {
      onError(error.response);
      complete();
    }
  };
}
