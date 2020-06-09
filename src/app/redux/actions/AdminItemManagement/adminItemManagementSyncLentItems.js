import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_BEGIN,
  ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_SYNC_LENTITEMS_TEMP } from '../serverConstants';

/**
 * Action creator for beginning of requesting lent items
 * @returns Redux action
 */
const AdminItemManagementSyncLentItemsBegin = () => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_BEGIN
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
const AdminItemManagementSyncLentItemsSuccess = ({ lentItems }) => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_SUCCESS,
  payload: { lentItems }
});

/**
 * Action creator for end of requesting items.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const AdminItemManagementSyncLentItemsFailure = error => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_FAILURE,
  payload: { error }
});

/**
 * Response schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  lentItems: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      title: yup.string().required(),
      image: yup.string().nullable(),
      requests: yup.array().of(
        yup.object().shape({
          id: yup.string().required(),
          itemId: yup.string().required(),
          studentId: yup.string().required(),
          dueTime: yup.date().required(),
          borrowedTime: yup.date().required(),
          status: yup.string().required(),
          Item: yup.object().shape({
            serialNumber: yup.string().required(),
            ItemSet: yup.object().shape({
              title: yup.string().required(),
              image: yup.string().nullable()
            })
          })
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
export default function AdminItemManagementSyncLentItems(token) {
  return async dispatch => {
    dispatch(AdminItemManagementSyncLentItemsBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(AdminItemManagementSyncLentItemsFailure(message));
    }

    function onSuccess(success) {
      try {
        const { lentItems } = responseSchema.validateSync(success);
        const items = [];
        lentItems.forEach(lab => {
          const labData = {
            id: lab.id,
            title: lab.title,
            image: lab.image
          };
          lab.requests.forEach(request => {
            items.push({
              lab: labData,
              request
            });
          });
        });

        dispatch(AdminItemManagementSyncLentItemsSuccess({ lentItems: items }));
      } catch (err) {
        dispatch(
          AdminItemManagementSyncLentItemsFailure(
            `Server connection failed. Please check your connection.${err}`
          )
        );
      }
    }

    try {
      const success = await axios.get(`${SERVER}${SERVER_SYNC_LENTITEMS_TEMP}`, {
        headers: { token }
      });
      onSuccess(success.data);
    } catch (error) {
      onError(error.response);
    }
  };
}
