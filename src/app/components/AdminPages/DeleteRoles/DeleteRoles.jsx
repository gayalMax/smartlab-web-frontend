import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteRolesPresenter from './DeleteRoles.presenter';
import { ADMIN_ADMINISTRATION_DELETE_ROLE } from '../../../redux/actionTypes';
import { sliceStateByAction } from '../../../helpers/helpers';
import adminAdministrationSyncRoles from '../../../redux/actions/AdminAdministration/adminAdministrationSyncRoles';

function DeleteRoles() {
  // NOTE: Here token refers to user JWT token, tokens refer to registration tokens
  const dispatch = useDispatch();
  const { roles, error, loading, token, success } = useSelector(state =>
    sliceStateByAction(state.adminAdministration, ADMIN_ADMINISTRATION_DELETE_ROLE, state)
  );

  useEffect(() => {
    if (!loading && roles.length === 0 && !error) {
      dispatch(adminAdministrationSyncRoles(token));
    }
  }, [dispatch, token, loading, roles, error]);

  const onRefresh = () => {
    dispatch(adminAdministrationSyncRoles(token));
  };

  const onDelete = () => {
    // dispatch(adminRegistrationRetract(token, email));
  };

  return (
    <DeleteRolesPresenter
      loading={loading}
      roles={roles}
      error={error}
      success={success}
      onRefresh={onRefresh}
      onDelete={onDelete}
    />
  );
}

export default DeleteRoles;
