import axios from 'axios';
import {
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_BEGIN,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_FAILURE,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_SUCCESS
} from '../../actionTypes';
import { SERVER, SERVER_CREATE_ITEM } from '../serverConstants';

/**
 * Action creator for beggining of creating items
 * @returns Redux action
 */
const adminItemManagementCreateItemBegin = () => ({
  type: ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_BEGIN
});

/**
 * Action creator for end of creating items
 * Action fired when the API call is successful
 * @returns Redux action
 */
const adminItemManagementCreateItemSuccess = success => ({
  type: ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of creating items
 * Action fired when the API cal is failed
 * @returns Redux action
 */
const adminItemManagementCreateItemFailure = error => ({
  type: ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_FAILURE,
  payload: { error }
});

/**
 * Request item details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminItemManagementCreateItem(
  token,
  serialNumber,
  itemSetId,
  labId,
  attributes,
  complete
) {
  return async dispatch => {
    dispatch(adminItemManagementCreateItemBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminItemManagementCreateItemFailure(message));
    }

    function onSuccess() {
      try {
        dispatch(
          adminItemManagementCreateItemSuccess(`Item '${serialNumber}' was created successfully.'`)
        );
      } catch (err) {
        dispatch(
          adminItemManagementCreateItemFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.post(
        `${SERVER}${SERVER_CREATE_ITEM}`,
        { serialNumber, itemSetId, labId, attributes },
        { headers: { token } }
      );
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
