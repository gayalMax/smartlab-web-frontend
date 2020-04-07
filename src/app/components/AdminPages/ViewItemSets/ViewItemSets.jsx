import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ViewItemSetsPresenter from './ViewItemSets.presenter';
import { adminItemManagementSyncItemsets } from '../../../redux/actions/AdminItemManagementActions';

function ViewItemSets() {
  const dispatch = useDispatch();
  const {
    syncedItemsets,
    itemSetsSyncLoading,
    itemSetsSyncSuccess,
    itemSetsSyncError,
    token
  } = useSelector(state => ({
    ...state.adminItemManagement,
    token: state.auth.token
  }));

  useEffect(() => {
    if (!itemSetsSyncLoading && !itemSetsSyncSuccess && !itemSetsSyncError) {
      dispatch(adminItemManagementSyncItemsets(token));
    }
  }, [dispatch, token, itemSetsSyncLoading, itemSetsSyncSuccess, itemSetsSyncError]);

  const onRefresh = () => {
    dispatch(adminItemManagementSyncItemsets(token));
  };

  return (
    <ViewItemSetsPresenter
      loading={itemSetsSyncLoading}
      itemSets={syncedItemsets}
      error={itemSetsSyncError}
      onRefresh={onRefresh}
    />
  );
}

export default ViewItemSets;
