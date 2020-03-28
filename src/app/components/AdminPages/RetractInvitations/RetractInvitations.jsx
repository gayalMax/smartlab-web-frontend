import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  adminRegistrationSyncTokens,
  adminRegistrationRetract
} from '../../../redux/actions/AdminRegistrationActions';
import RetractInvitationsPresenter from './RetractInvitations.presenter';

function RetractInvitations() {
  // NOTE: Here token refers to user JWT token, tokens refer to registration tokens
  const dispatch = useDispatch();
  const { tokens, error, loading, token, success } = useSelector(state => {
    return {
      ...state.adminRegistration,
      token: state.auth.token
    };
  });
  const registrationTokens = tokens;

  useEffect(() => {
    if (!loading && registrationTokens.length === 0 && !error) {
      dispatch(adminRegistrationSyncTokens(token));
    }
  }, [dispatch, token, loading, registrationTokens, error]);

  const onRefresh = () => {
    dispatch(adminRegistrationSyncTokens(token));
  };
  const onRetract = email => {
    dispatch(adminRegistrationRetract(token, email));
  };

  return (
    <RetractInvitationsPresenter
      loading={loading}
      registrationTokens={registrationTokens}
      error={error}
      success={success}
      onRefresh={onRefresh}
      onRetract={onRetract}
    />
  );
}

export default RetractInvitations;
