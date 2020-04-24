import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ViewSupervisorsPresenter from './ViewSupervisors.presenter';
import {
  adminAdministrationSyncSupervisors,
  adminAdministrationDeleteSupervisor
} from '../../../redux/actions/AdminAdministrationActions';

function ViewSupervisors() {
  const dispatch = useDispatch();
  const {
    supervisors,
    supervisorsSyncLoading,
    supervisorsSyncSuccess,
    supervisorsSyncError,
    supervisorDeleteLoading,
    supervisorDeleteSuccess,
    supervisorDeleteError,
    token
  } = useSelector(state => ({
    ...state.adminAdministration,
    token: state.auth.token
  }));

  useEffect(() => {
    if (!supervisorsSyncLoading && !supervisorsSyncSuccess && !supervisorsSyncError) {
      dispatch(adminAdministrationSyncSupervisors(token));
    }
  }, [dispatch, token, supervisorsSyncLoading, supervisorsSyncSuccess, supervisorsSyncError]);

  const onRefresh = () => {
    dispatch(adminAdministrationSyncSupervisors(token));
  };

  const deleteSupervisor = ({ id, name }) => {
    dispatch(adminAdministrationDeleteSupervisor(token, { id, name }));
  };

  return (
    <ViewSupervisorsPresenter
      loading={supervisorsSyncLoading || supervisorDeleteLoading}
      supervisors={supervisors}
      error={supervisorDeleteError || supervisorsSyncError}
      onRefresh={onRefresh}
      deleteSupervisor={deleteSupervisor}
      success={supervisorDeleteSuccess}
    />
  );
}

export default ViewSupervisors;
