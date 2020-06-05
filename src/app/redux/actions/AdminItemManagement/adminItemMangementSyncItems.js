import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_BEGIN,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_ITEMS_ALL } from '../serverConstants';

/**
 * Action creator for beginning of requesting items
 * @returns Redux action
 */
const AdminItemManagementSyncItemsBegin = () => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_BEGIN
});

/**
 * Action creator for end of requesting items.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.items ItemSets list
 * @param {string} response.items.id Id of the item
 * @param {string} response.items.serialNumber serialNumber of the item
 * @param {Object} response.items.Itemset Itemset of the item
 * @param {Object} response.items.Lab Lab of the item
 * @returns Redux action
 */
const AdminItemManagementSyncItemsSuccess = ({ items }) => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_SUCCESS,
  payload: { items }
});

/**
 * Action creator for end of requesting items.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const AdminItemManagementSyncItemsFailure = error => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_FAILURE,
  payload: { error }
});

/**
 * Response schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      serialNumber: yup.string().required(),
      ItemSet: yup
        .object()
        .shape({
          id: yup.string().required(),
          title: yup.string().required(),
          image: yup.string().nullable()
        })
        .required(),
      Lab: yup
        .object()
        .shape({
          id: yup.string().required(),
          title: yup.string().required(),
          subtitle: yup.string().required(),
          image: yup.string().nullable()
        })
        .required(),
      ItemAttributes: yup.array().of(
        yup.object().shape({
          key: yup.string().required()
        })
      )
    })
  )
});

/**
 * Request items details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for lab sign in API call
 */
export default function AdminItemManagementSyncItems(token) {
  return async dispatch => {
    dispatch(AdminItemManagementSyncItemsBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(AdminItemManagementSyncItemsFailure(message));
    }

    function onSuccess(success) {
      try {
        const { items } = responseSchema.validateSync(success.data);

        dispatch(AdminItemManagementSyncItemsSuccess({ items }));
      } catch (err) {
        dispatch(
          AdminItemManagementSyncItemsFailure(
            `Server connection failed. Please check your connection.${err}`
          )
        );
      }
    }

    try {
      const success = await axios.get(`${SERVER}${SERVER_GET_ITEMS_ALL}`, {
        headers: { token }
      });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
