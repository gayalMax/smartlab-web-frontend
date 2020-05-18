import axios from 'axios';

import {
  SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_BEGIN,
  SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_FAILURE,
  SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_SUCCESS
} from '../../actionTypes';
import { SERVER, SERVER_ACCEPT_REQUEST_ITEM } from '../serverConstants';

/**
 * Action creator for beginning of requesting itemsets
 * @returns Redux action
 */
const SupervisorItemManagementAcceptRequestBegin = () => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_BEGIN
});

const SupervisorItemManagementAcceptRequestSuccess = success => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_SUCCESS,
  payload: { success }
});

const SupervisorItemManagementAcceptRequestFailure = error => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_FAILURE,
  payload: { error }
});

export default function SupervisorItemManagementAcceptRequest(
  requestToken,
  acceptValue,
  acceptDeclineReason
) {
  return async dispatch => {
    dispatch(SupervisorItemManagementAcceptRequestBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(SupervisorItemManagementAcceptRequestFailure(message));
    }

    function onSuccess() {
      try {
        dispatch(SupervisorItemManagementAcceptRequestSuccess('Succesfully accepted the request'));
      } catch (err) {
        dispatch(
          SupervisorItemManagementAcceptRequestFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.post(`${SERVER}${SERVER_ACCEPT_REQUEST_ITEM}`, {
        requestToken,
        acceptValue,
        acceptDeclineReason
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
