import axios from 'axios';
import {
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_BEGIN,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_FAILURE,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_SUCCESS
} from '../../actionTypes';
import { SERVER, SERVER_CREATE_ITEMSET } from '../serverConstants';

/**
 * Action creator for beggining of creating itemsets
 * @returns Redux action
 */
const adminItemManagementCreateItemsetBegin = () => ({
  type: ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_BEGIN
});

/**
 * Action creator for end of creating itemsets
 * Action fired when the API call is successful
 * @returns Redux action
 */
const adminItemManagementCreateItemsetSuccess = success => ({
  type: ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_SUCCESS,
  payload: { success }
});

/**
 * Action creator for end of creating itemsets
 * Action fired when the API cal is failed
 * @returns Redux action
 */
const adminItemManagementCreateItemsetFailure = error => ({
  type: ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_FAILURE,
  payload: { error }
});

/**
 * Request itemset details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminItemManagementCreateItemset(
  token,
  title,
  image,
  attributes,
  complete
) {
  return async dispatch => {
    dispatch(adminItemManagementCreateItemsetBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminItemManagementCreateItemsetFailure(message));
    }

    function onSuccess() {
      try {
        dispatch(
          adminItemManagementCreateItemsetSuccess(`Item set '${title}' was created successfully.'`)
        );
      } catch (err) {
        dispatch(
          adminItemManagementCreateItemsetFailure(
            'Server connection failed. Please check your connection.'
          )
        );
      }
    }

    try {
      const success = await axios.post(
        `${SERVER}/${SERVER_CREATE_ITEMSET}`,
        { title, image, attributes },
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
