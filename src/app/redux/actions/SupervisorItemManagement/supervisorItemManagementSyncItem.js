import axios from 'axios';
// import * as yup from 'yup';

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

const SupervisorItemManagementSyncItemSuccess = ({ itemsets }) => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_SUCCESS,
  payload: { itemsets }
});

const SupervisorItemManagementSyncItemFailure = error => ({
  type: SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_FAILURE,
  payload: { error }
});

// const responseSchema = yup.object().shape({
//   Itemsets: yup.array().of(
//     yup.object().shape({
//       id: yup.string().required(),
//       title: yup.string().required(),
//       image: yup.string().nullable(),
//       Attributes: yup.array().of(
//         yup.object().shape({
//           key: yup.string().required(),
//           defaultValue: yup.string().required(),
//           editable: yup.boolean().required()
//         })
//       )
//     })
//   )
// });

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
        const { Itemsets } = success.data;
        dispatch(SupervisorItemManagementSyncItemSuccess({ itemsets: Itemsets }));
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
