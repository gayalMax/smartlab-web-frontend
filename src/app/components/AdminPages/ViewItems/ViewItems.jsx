import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ViewItemsPresenter from './ViewItems.presenter';
import { adminItemManagementSyncItems } from '../../../redux/actions/AdminItemManagementActions';

function ViewItems() {
  const dispatch = useDispatch();
  const { syncedItems, itemsSyncLoading, itemsSyncSuccess, itemsSyncError, token } = useSelector(
    state => ({
      ...state.adminItemManagement,
      token: state.auth.token
    })
  );
console.log(syncedItems);
  useEffect(() => {
    if (!itemsSyncLoading && !itemsSyncSuccess && !itemsSyncError) {
      dispatch(adminItemManagementSyncItems(token));
    }
  }, [dispatch, token, itemsSyncLoading, itemsSyncSuccess, itemsSyncError]);

  const onRefresh = () => {
    dispatch(adminItemManagementSyncItems(token));
  };

  return (
    <ViewItemsPresenter
      loading={itemsSyncLoading}
      items={syncedItems}
      error={itemsSyncError}
      onRefresh={onRefresh}
    />
  );
}

export default ViewItems;
