import produce from 'immer';

import {
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_BEGIN,
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_SUCCESS,
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_FAILURE
} from '../actionTypes';
import initialState from '../states/supervisorItemManagementState';

const supervisorItemManagementReducer = produce((draft, { type, payload }) => {
  if (!draft) {
    return initialState;
  }

  switch (type) {
    // create itemset
    case SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_BEGIN:
      draft.syncedItem = [];
      draft.itemsSyncSuccess = null;
      draft.itemsSyncError = null;
      draft.itemsSyncLoading = true;
      return draft;
    case SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_SUCCESS:
      draft.syncedItem = payload.itemsets;
      draft.itemsSyncLoading = false;
      draft.itemsSyncSuccess = payload.success;
      return draft;
    case SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_FAILURE:
      draft.itemsSyncLoading = false;
      draft.itemsSyncErrorr = payload.error;
      return draft;

    default:
      return draft;
  }
});

export { supervisorItemManagementReducer, initialState };
