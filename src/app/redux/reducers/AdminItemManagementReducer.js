import produce from 'immer';

import {
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_BEGIN,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_FAILURE,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEMSET_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_BEGIN,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMSETS_FAILURE,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_BEGIN,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_FAILURE,
  ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_BEGIN,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_FAILURE,
  ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_SUCCESS,
  ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_BEGIN,
  ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_FAILURE,
  ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_SUCCESS
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
    // create itemset
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

    // create item
    case ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_BEGIN:
      draft.createItemSuccess = null;
      draft.createItemError = null;
      draft.createItemLoading = true;
      return draft;
    case ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_SUCCESS:
      draft.createItemLoading = false;
      draft.createItemSuccess = payload.success;
      return draft;
    case ADMIN_ITEM_MANAGEMENT_CREATE_ITEM_FAILURE:
      draft.createItemLoading = false;
      draft.createItemError = payload.error;
      return draft;

    // Syncing items
    case ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_BEGIN:
      draft.syncedItems = [];
      draft.itemsSyncLoading = true;
      draft.itemsSyncSuccess = false;
      draft.itemsSyncError = null;
      return draft;
    case ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_SUCCESS:
      draft.syncedItems = payload.items;
      draft.itemsSyncLoading = false;
      draft.itemsSyncSuccess = true;
      return draft;
    case ADMIN_ITEM_MANAGEMENT_SYNC_ITEMS_FAILURE:
      draft.itemsSyncLoading = false;
      draft.itemsSyncError = payload.error;
      return draft;

    // syncing lent items
    case ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_BEGIN:
      draft.lentItemsSyncLoading = true;
      draft.lentItemsSyncSuccess = false;
      draft.lentItemsSyncError = null;
      return draft;

    case ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_SUCCESS:
      draft.syncedLentItems = payload.lentItems;
      draft.lentItemsSyncLoading = false;
      draft.lentItemsSyncSuccess = true;
      return draft;

    case ADMIN_ITEM_MANAGEMENT_SYNC_LENT_ITEMS_FAILURE:
      draft.lentItemsSyncLoading = false;
      draft.lentItemsSyncError = payload.error;
      return draft;

    default:
      return draft;
  }
});

export { adminItemManagementReducer, initialState };
