import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ViewLabsPresenter from './ViewLabs.presenter';
import { adminLabManagementSyncLabs } from '../../../redux/actions/AdminLabManagementActions';

function ViewLabs() {
  const dispatch = useDispatch();
  const { labs, labsSyncLoading, labsSyncSuccess, labsSyncError, token } = useSelector(state => ({
    ...state.adminLabManagement,
    token: state.auth.token
  }));

  useEffect(() => {
    if (!labsSyncLoading && !labsSyncSuccess && !labsSyncError) {
      dispatch(adminLabManagementSyncLabs(token));
    }
  }, [dispatch, token, labsSyncLoading, labsSyncSuccess, labsSyncError]);

  const onRefresh = () => {
    dispatch(adminLabManagementSyncLabs(token));
  };

  return (
    <ViewLabsPresenter
      loading={labsSyncLoading}
      labs={labs}
      error={labsSyncError}
      onRefresh={onRefresh}
    />
  );
}

export default ViewLabs;
