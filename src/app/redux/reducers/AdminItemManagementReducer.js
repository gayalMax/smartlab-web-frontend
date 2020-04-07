import produce from 'immer';

import {
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_BEGIN,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_FAILURE,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_BEGIN,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_FAILURE
} from '../actionTypes';
import initialState from '../states/adminItemManagementState';

/**
 * Item Managements state reducer
 * @param {Object} state current state of the application
 * @returns {Object} Altered state of the application
 */

const adminItemManagementReducer = produce((draft, { type, payload }) => {
  if (!draft) {
    return initialState;
  }

  switch (type) {
    case ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_BEGIN:
      draft.createItemsetSuccess = null;
      draft.createItemsetError = null;
      draft.createItemsetLoading = true;
      return draft;
    case ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_SUCCESS:
      draft.createItemsetLoading = false;
      draft.createItemsetSuccess = payload.success;
      return draft;
    case ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_FAILURE:
      draft.createItemsetLoading = false;
      draft.createItemsetError = payload.error;
      return draft;

    // Syncing itemSets
    case ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_BEGIN:
      draft.syncedItemsets = [];
      draft.itemSetsSyncLoading = true;
      draft.itemSetsSyncSuccess = false;
      draft.itemSetsSyncError = null;
      return draft;
    case ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_SUCCESS:
      draft.syncedItemsets = payload.itemsets;
      draft.itemSetsSyncLoading = false;
      draft.itemSetsSyncSuccess = true;
      return draft;
    case ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_FAILURE:
      draft.itemSetsSyncLoading = false;
      draft.itemSetsSyncError = payload.error;
      return draft;
    default:
      return draft;
  }
});

export { adminItemManagementReducer, initialState };
