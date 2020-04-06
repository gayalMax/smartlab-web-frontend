import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ViewUsersPresenter from './ViewUsers.presenter';
import { adminAdministrationSyncUsers } from '../../../redux/actions/AdminAdministrationActions';

function ViewUsers() {
  const dispatch = useDispatch();
  const { users, usersSyncLoading, usersSyncSuccess, usersSyncError, token } = useSelector(
    state => ({
      ...state.adminAdministration,
      token: state.auth.token
    })
  );

  useEffect(() => {
    if (!usersSyncLoading && !usersSyncSuccess && !usersSyncError) {
      dispatch(adminAdministrationSyncUsers(token));
    }
  }, [dispatch, token, usersSyncLoading, usersSyncSuccess, usersSyncError]);

  const onRefresh = () => {
    dispatch(adminAdministrationSyncUsers(token));
  };

  return (
    <ViewUsersPresenter
      loading={usersSyncLoading}
      users={users}
      error={usersSyncError}
      onRefresh={onRefresh}
    />
  );
}

export default ViewUsers;
