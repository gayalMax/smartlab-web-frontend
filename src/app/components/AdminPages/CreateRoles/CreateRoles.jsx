import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateRolesPresenter from './CreateRoles.presenter';
import { ADMIN_ADMINISTRATION_CREATE_ROLES } from '../../../redux/actionTypes';
import { sliceStateByAction } from '../../../helpers/helpers';
import adminAdministrationSyncPermissions from '../../../redux/actions/AdminAdministration/adminAdministrationSyncPermissions';

function CreateRoles() {
  const dispatch = useDispatch();

  const { permissions, error, loading, token, success } = useSelector(state =>
    sliceStateByAction(state.adminAdministration, ADMIN_ADMINISTRATION_CREATE_ROLES, state)
  );

  useEffect(() => {
    if (!loading && permissions.length === 0 && !error) {
      dispatch(adminAdministrationSyncPermissions(token));
    }
  }, [token, permissions, loading, error]);

  return (
    <CreateRolesPresenter
      permissions={permissions}
      error={error}
      loading={loading}
      success={success}
    />
  );
}

export default CreateRoles;
