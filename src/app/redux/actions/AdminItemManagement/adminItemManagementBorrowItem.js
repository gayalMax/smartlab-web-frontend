import axios from 'axios';

import {
  ADMIN_ITEM_MANAGEMENT_BORROW_ITEM_BEGIN,
  ADMIN_ITEM_MANAGEMENT_BORROW_ITEM_FAILURE,
  ADMIN_ITEM_MANAGEMENT_BORROW_ITEM_SUCCESS
} from '../../actionTypes';
import { SERVER, SERVER_LEND_ITEM, SERVER_RETURN_ITEM } from '../serverConstants';
import AdminItemManagementSyncItemRequests from './adminItemManagementSyncItemRequests';

/**
 * Action creator for beginning of requesting lent items
 * @returns Redux action
 */
const AdminItemManagementBorrowItemBegin = () => ({
  type: ADMIN_ITEM_MANAGEMENT_BORROW_ITEM_BEGIN
});

/**
 * Action creator for end of requesting lent items.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @returns Redux action
 */
const AdminItemManagementBorrowItemSuccess = success => ({
  type: ADMIN_ITEM_MANAGEMENT_BORROW_ITEM_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of requesting items.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const AdminItemManagementBorrowItemFailure = error => ({
  type: ADMIN_ITEM_MANAGEMENT_BORROW_ITEM_FAILURE,
  payload: { error }
});

/**
 * item requests details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for sync item requests in API call
 */
export default function AdminItemManagementBorrowItem(userId, itemId, requestId, status, token) {
  return async dispatch => {
    dispatch(AdminItemManagementBorrowItemBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(AdminItemManagementBorrowItemFailure(message));
    }

    function onSuccess() {
      if (status === 'ACCEPTED') {
        dispatch(AdminItemManagementBorrowItemSuccess('Item successfully lent.'));
      } else {
        dispatch(AdminItemManagementBorrowItemSuccess('Item successfully received.'));
      }
      dispatch(AdminItemManagementSyncItemRequests(userId, token));
    }

    let endPoint;
    if (status === 'ACCEPTED') {
      endPoint = `${SERVER}${SERVER_LEND_ITEM}`;
    } else {
      endPoint = `${SERVER}${SERVER_RETURN_ITEM}`;
    }

    try {
      const success = await axios.post(
        endPoint,
        { itemId, requestId },
        {
          headers: { token }
        }
      );
      if (success.status !== 200) {
        throw Error('Server responded with an error');
      }

      onSuccess();
    } catch (error) {
      onError(error.response);
    }
  };
}
