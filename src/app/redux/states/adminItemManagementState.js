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
  itemsSyncError: null,

  syncedLentItems: [],

  lentItemsSyncLoading: false,
  lentItemsSyncSuccess: null,
  lentItemsSyncError: null,

  syncedItemRequests: [],

  itemRequestsSyncloading: false,
  itemRequestsSyncSuccess: null,
  itemRequestsSyncError: null,

  itemBorrowLoading: false,
  itemBorrowSuccess: null,
  itemBorrowFailure: null
};

export default initialState;
