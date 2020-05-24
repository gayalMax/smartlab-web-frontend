import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LendItemsPresenter from './LendItems.presenter';
import {
  AdminItemManagementSyncItemRequests,
  AdminItemManagementBorrowItem
} from '../../../redux/actions/AdminItemManagementActions';

function LendItems() {
  const dispatch = useDispatch();

  const {
    syncedItemRequests,
    itemRequestsSyncloading,
    itemRequestsSyncSuccess,
    itemRequestsSyncError,
    itemBorrowLoading,
    itemBorrowSuccess,
    itemBorrowFailure,
    token,
    userId
  } = useSelector(state => ({
    ...state.adminItemManagement,
    token: state.auth.token,
    userId: state.auth.user.id
  }));
  const addLentItem = (requestId, itemId, status) => () => {
    dispatch(AdminItemManagementBorrowItem(requestId, itemId, status, token));
  };

  const returnLentItem = (requestId, itemId, status) => () => {
    dispatch(AdminItemManagementBorrowItem(requestId, itemId, status, token));
  };

  useEffect(() => {
    if (!itemRequestsSyncloading && !itemRequestsSyncSuccess && !itemRequestsSyncError) {
      dispatch(AdminItemManagementSyncItemRequests(userId, token));
    }
  }, [dispatch, itemRequestsSyncloading, itemRequestsSyncSuccess, itemRequestsSyncError]);

  return (
    <LendItemsPresenter
      loading={itemRequestsSyncloading || itemBorrowLoading}
      itemRequests={syncedItemRequests}
      addLentItem={addLentItem}
      returnLentItem={returnLentItem}
      error={itemRequestsSyncError || itemBorrowFailure}
      success={itemBorrowSuccess}
    />
  );
}

export default LendItems;
