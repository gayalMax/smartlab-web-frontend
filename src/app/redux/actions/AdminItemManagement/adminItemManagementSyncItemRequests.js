import axios from 'axios';
// import * as yup from 'yup';

import {
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEM_REQUESTS_BEGIN,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEM_REQUESTS_FAILURE,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEM_REQUESTS_SUCCESS
} from '../../actionTypes';
import { SERVER, SERVER_SYNC_ITEM_REQUESTS_ALL, SERVER_GET_USER_LABS } from '../serverConstants';

/**
 * Action creator for beginning of requesting lent items
 * @returns Redux action
 */
const AdminItemManagementSyncItemRequestsBegin = () => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEM_REQUESTS_BEGIN
});

/**
 * Action creator for end of requesting lent items.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.lentItems lent items list
 * @param {string} response.lentItems.id Id of the item
 * @param {string} response.items.serialNumber serialNumber of the item
 * @param {Object} response.items.Itemset Itemset of the item
 * @param {Object} response.items.Lab Lab of the item
 * @returns Redux action
 */
const AdminItemManagementSyncItemRequestsSuccess = ({ itemRequests }) => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEM_REQUESTS_SUCCESS,
  payload: { itemRequests }
});

/**
 * Action creator for end of requesting items.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const AdminItemManagementSyncItemRequestsFailure = error => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEM_REQUESTS_FAILURE,
  payload: { error }
});

/**
 * item requests details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for sync item requests in API call
 */
export default function AdminItemManagementSyncItemRequests(userId, token) {
  return async dispatch => {
    dispatch(AdminItemManagementSyncItemRequestsBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(AdminItemManagementSyncItemRequestsFailure(message));
    }

    function onSuccess(itemRequests) {
      dispatch(AdminItemManagementSyncItemRequestsSuccess({ itemRequests }));
    }

    try {
      const successGetLabs = await axios.get(
        `${SERVER}${SERVER_GET_USER_LABS}/${userId}/assignedlabs`,
        {
          headers: { token }
        }
      );

      const { labs } = successGetLabs.data;
      const itemRequests = [];

      Promise.all(
        labs.map(({ id: labId }) =>
          axios.get(`${SERVER}${SERVER_SYNC_ITEM_REQUESTS_ALL}/${labId}`, {
            headers: { token }
          })
        )
      ).then(resolvedValues => {
        resolvedValues.forEach(value => {
          const { data } = value;
          itemRequests.push(data);
        });
      });

      onSuccess(itemRequests);
    } catch (error) {
      onError(error.response);
    }
  };
}
