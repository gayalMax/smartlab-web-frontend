import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ViewTemporaryItemsPresenter from './ViewTemporaryItems.presenter';
import { AdminItemManagementSyncLentItems } from '../../../redux/actions/AdminItemManagementActions';

function ViewTemporaryItems() {
  const dispatch = useDispatch();
  const {
    syncedLentItems,
    lentItemsSyncLoading,
    lentItemsSyncSuccess,
    lentItemsSyncError,
    token
  } = useSelector(state => ({
    ...state.adminItemManagement,
    token: state.auth.token
  }));
  useEffect(() => {
    if (!lentItemsSyncLoading && !lentItemsSyncSuccess && !lentItemsSyncError) {
      dispatch(AdminItemManagementSyncLentItems(token));
    }
  }, [dispatch, token, lentItemsSyncLoading, lentItemsSyncSuccess, lentItemsSyncError]);

  const onRefresh = () => {
    dispatch(AdminItemManagementSyncLentItems(token));
  };

  return (
    <ViewTemporaryItemsPresenter
      lentItems={syncedLentItems}
      onRefresh={onRefresh}
      error={lentItemsSyncError}
      loading={lentItemsSyncLoading}
    />
  );
}

export default ViewTemporaryItems;
