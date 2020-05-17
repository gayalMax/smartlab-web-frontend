import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RequestItemPresenter from './RequestItem.presenter';
import supervisorItemManagementSyncItem from '../../../redux/actions/SupervisorItemManagementActions';

function RequestItem() {
  const dispatch = useDispatch();
  const { syncedItem, itemsSyncLoading, itemsSyncSuccess, itemsSyncError } = useSelector(state => ({
    ...state.supervisorItemManagementSyncItem
  }));

  const { requestToken } = useParams();

  useEffect(() => {
    if (!itemsSyncLoading && !itemsSyncSuccess && !itemsSyncError) {
      dispatch(supervisorItemManagementSyncItem(requestToken));
    }
  }, [dispatch, requestToken, itemsSyncLoading, itemsSyncSuccess, itemsSyncError, syncedItem]);

  const onRefresh = () => {
    dispatch(supervisorItemManagementSyncItem(requestToken));
  };

  return (
    <RequestItemPresenter
      loading={itemsSyncLoading}
      items={syncedItem}
      error={itemsSyncError}
      onRefresh={onRefresh}
    />
  );
}

export default RequestItem;
