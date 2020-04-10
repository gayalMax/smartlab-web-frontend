import axios from 'axios';
import * as yup from 'yup';

import {
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_BEGIN,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_FAILURE
} from '../../actionTypes';
import { SERVER, SERVER_GET_ITEMSETS_ALL } from '../serverConstants';

/**
 * Action creator for beginning of requesting itemsets
 * @returns Redux action
 */
const AdminItemManagementSyncItemSetsBegin = () => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_BEGIN
});

/**
 * Action creator for end of requesting itemsets.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.itemsets ItemSets list
 * @param {string} response.itemsets.id Id of the lab
 * @param {string} response.itemsets.title Title of the lab
 * @param {string} response.itemsets.subtitle Subtitle of the lab
 * @param {string} response.itemsets.image Image of the lab
 * @param {Date} response.itemsets.createdAt Created timestamp of the lab
 * @param {Date} response.itemsets.updatedAt Updated timestamp of the lab
 * @returns Redux action
 */
const AdminItemManagementSyncItemSetsSuccess = ({ itemsets }) => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_SUCCESS,
  payload: { itemsets }
});

/**
 * Action creator for end of requesting itemsets.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const AdminItemManagementSyncItemSetsFailure = error => ({
  type: ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_FAILURE,
  payload: { error }
});

/**
 * Response schema used to validate response sent by the API
 */
const responseSchema = yup.object().shape({
  Itemsets: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      title: yup.string().required(),
      image: yup.string().nullable(),
      Attributes: yup.array().of(
        yup.object().shape({
          key: yup.string().required(),
          defaultValue: yup.string().required(),
          editable: yup.boolean().required()
        })
      )
    })
  )
});

/**
 * Request itemsets details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for lab sign in API call
 */
export default function AdminItemManagementSyncItemSets(token) {
  return async dispatch => {
    dispatch(AdminItemManagementSyncItemSetsBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(AdminItemManagementSyncItemSetsFailure(message));
    }

    function onSuccess(success) {
      try {
        const { Itemsets } = responseSchema.validateSync(success.data);
        dispatch(AdminItemManagementSyncItemSetsSuccess({ itemsets: Itemsets }));
      } catch (err) {
        dispatch(
          AdminItemManagementSyncItemSetsFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.get(`${SERVER}${SERVER_GET_ITEMSETS_ALL}`, {
        headers: { token }
      });
      onSuccess(success);
    } catch (error) {
      onError(error.response);
    }
  };
}
