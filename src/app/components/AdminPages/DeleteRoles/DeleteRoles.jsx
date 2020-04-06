import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteRolesPresenter from './DeleteRoles.presenter';
import {
  adminAdministrationSyncRoles,
  adminAdministrationDeleteRole
} from '../../../redux/actions/AdminAdministrationActions';

function DeleteRoles() {
  const dispatch = useDispatch();
  const {
    roles,
    rolesSyncLoading,
    rolesSyncSuccess,
    rolesSyncError,
    roleDeleteLoading,
    roleDeleteSuccess,
    roleDeleteError,
    token
  } = useSelector(state => ({
    ...state.adminAdministration,
    token: state.auth.token
  }));

  useEffect(() => {
    if (!rolesSyncLoading && !rolesSyncSuccess && !rolesSyncError) {
      dispatch(adminAdministrationSyncRoles(token));
    }
  }, [dispatch, token, rolesSyncLoading, rolesSyncSuccess, rolesSyncError]);

  const onRefresh = () => {
    dispatch(adminAdministrationSyncRoles(token));
  };

  const onDelete = role => {
    dispatch(adminAdministrationDeleteRole(token, role));
  };

  return (
    <DeleteRolesPresenter
      loading={roleDeleteLoading || rolesSyncLoading}
      roles={roles}
      error={roleDeleteError || rolesSyncError}
      success={roleDeleteSuccess}
      onRefresh={onRefresh}
      onDelete={onDelete}
    />
  );
}

export default DeleteRoles;
