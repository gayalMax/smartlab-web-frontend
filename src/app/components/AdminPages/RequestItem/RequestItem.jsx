import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RequestItemPresenter from './RequestItem.presenter';
import supervisorItemManagementSyncItem from '../../../redux/actions/SupervisorItemManagementActions';

function RequestItem() {
  const dispatch = useDispatch();
  const { syncedItems, itemsSyncLoading, itemsSyncSuccess, itemsSyncError } = useSelector(
    state => ({
      ...state.adminItemManagement
    })
  );

  const { requestToken } = useParams();

  useEffect(() => {
    if (!itemsSyncLoading && !itemsSyncSuccess && !itemsSyncError) {
      dispatch(supervisorItemManagementSyncItem(requestToken));
    }
  }, [dispatch, requestToken, itemsSyncLoading, itemsSyncSuccess, itemsSyncError]);

  const onRefresh = () => {
    dispatch(supervisorItemManagementSyncItem(requestToken));
  };

  return (
    <RequestItemPresenter
      loading={itemsSyncLoading}
      items={syncedItems}
      error={itemsSyncError}
      onRefresh={onRefresh}
    />
  );
}

export default RequestItem;
