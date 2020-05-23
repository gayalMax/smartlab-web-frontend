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
    token,
    userId
  } = useSelector(state => ({
    ...state.adminItemManagement,
    token: state.auth.token,
    userId: state.auth.user.id
  }));

  const addLentItem = (requestId, itemId) => () => {
    dispatch(AdminItemManagementBorrowItem(requestId, itemId, token));
  };

  const returnLentItem = () => () => {};

  useEffect(() => {
    if (!itemRequestsSyncloading && !itemRequestsSyncSuccess && !itemRequestsSyncError) {
      dispatch(AdminItemManagementSyncItemRequests(userId, token));
    }
  }, [dispatch, itemRequestsSyncloading, itemRequestsSyncSuccess, itemRequestsSyncError]);

  return (
    <LendItemsPresenter
      loading={itemRequestsSyncloading}
      itemRequests={syncedItemRequests}
      addLentItem={addLentItem}
      returnLentItem={returnLentItem}
      error={itemRequestsSyncError}
    />
  );
}

export default LendItems;
