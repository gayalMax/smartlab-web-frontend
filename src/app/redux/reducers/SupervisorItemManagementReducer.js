import produce from 'immer';

import {
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_BEGIN,
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_SUCCESS,
  SUPERVISOR_ITEM_MANAGEMENT_SYNC_ITEM_FAILURE,
  SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_BEGIN,
  SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_SUCCESS,
  SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_FAILURE,
  SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_BEGIN,
  SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_FAILURE,
  SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_SUCCESS
} from '../actionTypes';
import initialState from '../states/supervisorItemManagementState';

const supervisorItemManagementReducer = produce((draft, { type, payload }) => {
  if (!draft) {
    return initialState;
  }

  switch (type) {
    // sync item set
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
    // accept request
    case SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_BEGIN:
      draft.acceptRequestLoading = true;
      draft.acceptRequestSuccess = null;
      draft.acceptRequestError = null;
      return draft;

    case SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_SUCCESS:
      draft.acceptRequestLoading = false;
      draft.acceptRequestSuccess = payload.success;
      return draft;

    case SUPERVISOR_ITEM_MANAGEMENT_ACCEPT_REQUEST_FAILURE:
      draft.acceptRequestLoading = false;
      draft.acceptRequestError = payload.error;
      return draft;

    // reject the request
    case SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_BEGIN:
      draft.rejectRequestLoading = true;
      draft.rejectRequestSuccess = null;
      draft.rejectRequestError = null;
      return draft;

    case SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_SUCCESS:
      draft.rejectRequestLoading = false;
      draft.rejectRequestSuccess = payload.success;
      return draft;

    case SUPERVISOR_ITEM_MANAGEMENT_REJECT_REQUEST_FAILURE:
      draft.rejectRequestLoading = false;
      draft.rejectRequestError = payload.error;
      return draft;

    default:
      return draft;
  }
});

export { supervisorItemManagementReducer, initialState };
