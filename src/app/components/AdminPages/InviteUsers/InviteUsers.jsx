import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  adminRegistrationSyncRoles,
  adminRegistrationInvite
} from '../../../redux/actions/AdminRegistrationActions';
import InviteUsersPresenter from './InviteUsers.presenter';
import * as EVENTS from './InviteUsers.events';

function InviteUsers() {
  // To dispatch api calls
  const dispatch = useDispatch();
  // Take token and other state slice. Token is required for api call.
  const {
    roles,
    rolesSyncLoading,
    rolesSyncError,
    rolesSyncSuccess,
    inviteLoading,
    inviteError,
    inviteSuccess,
    token
  } = useSelector(state => ({ ...state.adminRegistration, token: state.auth.token }));

  // If roles are not loaded(and the request is not already submitted) request to sync roles
  useEffect(() => {
    if (!rolesSyncLoading && !rolesSyncSuccess && !rolesSyncError) {
      dispatch(adminRegistrationSyncRoles(token));
    }
  }, [dispatch, token, rolesSyncError, rolesSyncSuccess, rolesSyncLoading]);

  // State management of emails and roles
  const [formState, setFormState] = useState({ emails: [], role: null });

  // User requested to refresh roles list
  const refreshRoles = () => {
    dispatch(adminRegistrationSyncRoles(token));
  };

  // User submitted the form
  const onSubmit = () => {
    dispatch(adminRegistrationInvite(token, formState.emails, formState.role));
  };

  // Emails were changed
  const emailsOnChange = emails => {
    setFormState({ ...formState, emails });
  };

  // Selected role was changed
  const roleOnChange = event => {
    setFormState({ ...formState, role: event.target.value });
  };

  // Event mapper which maps event to the callback
  const handleEvent = event => {
    switch (event) {
      case EVENTS.REFRESH_ROLES:
        return refreshRoles;
      case EVENTS.FORM_SUBMIT:
        return onSubmit;
      case EVENTS.EMAILS_ONCHANGE:
        return emailsOnChange;
      case EVENTS.ROLE_ONCHANGE:
        return roleOnChange;
      default:
        return () => {};
    }
  };

  return (
    <InviteUsersPresenter
      loading={inviteLoading || rolesSyncLoading}
      roles={roles}
      error={inviteError || rolesSyncError}
      success={inviteSuccess}
      handleEvent={handleEvent}
    />
  );
}

export default InviteUsers;
