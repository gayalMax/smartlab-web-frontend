/**
 * Initial state of the admin labs state
 */
const initialState = {
  attributes: [],
  itemsets: [],

  syncedItemsets: [],

  createItemsetError: null,
  createItemsetLoading: false,
  createItemsetSuccess: null,

  itemSetsSyncLoading: false,
  itemSetsSyncSuccess: null,
  itemSetsSyncError: null,

  items: [],

  syncedItems: [],

  createItemError: null,
  createItemLoading: false,
  createItemSuccess: null,

  itemsSyncLoading: false,
  itemsSyncSuccess: null,
  itemsSyncError: null
};

export default initialState;
