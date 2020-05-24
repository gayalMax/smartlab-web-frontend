import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ViewLentItemsPresenter from './ViewLentItems.presenter';
import { AdminItemManagementSyncLentItems } from '../../../redux/actions/AdminItemManagementActions';

function ViewLentItems() {
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
    <ViewLentItemsPresenter
      lentItems={syncedLentItems}
      onRefresh={onRefresh}
      error={lentItemsSyncError}
      loading={lentItemsSyncLoading}
    />
  );
}

export default ViewLentItems;
