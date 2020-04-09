import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AssignStaffPresenter from './AssignStaff.presenter';
import {
  adminLabManagementSyncLabs,
  adminLabManagementSyncInventoryUsers
} from '../../../redux/actions/AdminLabManagementActions';

const AssignStaff = () => {
  const dispatch = useDispatch();
  const {
    labs,
    managers,
    labsSyncLoading,
    labsSyncSuccess,
    labsSyncError,
    managersSyncLoading,
    managersSyncSuccess,
    managersSyncError,
    token
  } = useSelector(state => ({
    ...state.adminLabManagement,
    token: state.auth.token
  }));

  useEffect(() => {
    if (!labsSyncLoading && !labsSyncSuccess && !labsSyncError) {
      dispatch(adminLabManagementSyncLabs(token));
    }
    if (!managersSyncLoading && !managersSyncSuccess && !managersSyncError) {
      dispatch(adminLabManagementSyncInventoryUsers(token));
    }
  }, [
    dispatch,
    token,
    labsSyncLoading,
    labsSyncSuccess,
    labsSyncError,
    managers,
    managersSyncLoading,
    managersSyncSuccess,
    managersSyncError
  ]);

  const onAssigned = (labId, userId) => {
    console.log({ labId, userId });
  };

  const onUnassigned = (labId, userId) => {
    console.log({ labId, userId });
  };

  const onRefresh = () => {
    dispatch(adminLabManagementSyncLabs(token));
    dispatch(adminLabManagementSyncInventoryUsers(token));
  };

  return (
    <AssignStaffPresenter
      labs={labs}
      managers={managers}
      onRefresh={onRefresh}
      loading={labsSyncLoading || managersSyncLoading}
      error={labsSyncError || managersSyncError}
      onAssigned={onAssigned}
      onUnassigned={onUnassigned}
    />
  );
};

export default AssignStaff;
