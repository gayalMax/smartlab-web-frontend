import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteRolesPresenter from './DeleteRoles.presenter';
import { adminAdministrationSyncRoles } from '../../../redux/actions/AdminAdministrationActions';

function DeleteRoles() {
  const dispatch = useDispatch();
  const { roles, rolesSyncLoading, rolesSyncSuccess, rolesSyncError, token } = useSelector(
    state => ({
      ...state.adminAdministration,
      token: state.auth.token
    })
  );

  useEffect(() => {
    if (!rolesSyncLoading && !rolesSyncSuccess && !rolesSyncError) {
      dispatch(adminAdministrationSyncRoles(token));
    }
  }, [dispatch, token, rolesSyncLoading, rolesSyncSuccess, rolesSyncError]);

  const onRefresh = () => {
    dispatch(adminAdministrationSyncRoles(token));
  };

  return (
    <DeleteRolesPresenter
      loading={rolesSyncLoading}
      roles={roles}
      error={rolesSyncError}
      onRefresh={onRefresh}
    />
  );
}

export default DeleteRoles;
