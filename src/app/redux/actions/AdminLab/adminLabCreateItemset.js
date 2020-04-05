import axios from 'axios';
import {
  ADMIN_LAB_CREATE_ITEMSET_BEGIN,
  ADMIN_LAB_CREATE_ITEMSET_FAILURE,
  ADMIN_LAB_CREATE_ITEMSET_SUCCESS
} from '../../actionTypes';
import { SERVER, SERVER_CREATE_ITEMSET } from '../serverConstants';

/**
 * Action creator for beggining of creating itemsets
 * @returns Redux action
 */
const adminLabCreateItemsetBegin = () => ({
  type: ADMIN_LAB_CREATE_ITEMSET_BEGIN
});

/**
 * Action creator for end of creating itemsets
 * Action fired when the API call is successful
 * @returns Redux action
 */
const adminLabCreateItemsetSuccess = () => ({
  type: ADMIN_LAB_CREATE_ITEMSET_SUCCESS
});

/**
 * Action creator for end of creating itemsets
 * Action fired when the API cal is failed
 * @returns Redux action
 */
const adminLabCreateItemsetFailure = error => ({
  type: ADMIN_LAB_CREATE_ITEMSET_FAILURE,
  payload: { error }
});

/**
 * Request itemset details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminLabCreateItemset(token, title, image, attributes, complete) {
  return async dispatch => {
    dispatch(adminLabCreateItemsetBegin());

    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminLabCreateItemsetFailure(message));
    }

    function onSuccess() {
      try {
        dispatch(adminLabCreateItemsetSuccess());
      } catch (err) {
        dispatch(
          adminLabCreateItemsetFailure('Server connection failed. Please check your connection.')
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
