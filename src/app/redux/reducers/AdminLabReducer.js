import produce from 'immer';

import {
  ADMIN_LAB_CREATE_ITEMSET,
  ADMIN_LAB_CREATE_ITEMSET_BEGIN,
  ADMIN_LAB_CREATE_ITEMSET_FAILURE,
  ADMIN_LAB_CREATE_ITEMSET_SUCCESS
} from '../actionTypes';
import initialState from '../states/adminLabsState';

/**
 * Labs state reducer
 * @param {Object} state current state of the application
 * @returns {Object} Altered state of the application
 */

const adminLabReducer = produce((draft, { type, payload }) => {
  if (!draft) {
    return initialState;
  }

  switch (type) {
    case ADMIN_LAB_CREATE_ITEMSET_BEGIN:
      draft.action = ADMIN_LAB_CREATE_ITEMSET;
      draft.success = false;
      draft.error = null;
      draft.loading = true;
      return draft;
    case ADMIN_LAB_CREATE_ITEMSET_SUCCESS:
      draft.loading = false;
      draft.success = true;
      return draft;
    case ADMIN_LAB_CREATE_ITEMSET_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    default:
      return draft;
  }
});

export { adminLabReducer, initialState };
