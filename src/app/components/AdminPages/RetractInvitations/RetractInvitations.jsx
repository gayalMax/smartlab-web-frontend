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

  const {
    tokens,
    token,
    tokenSyncLoading,
    tokenSyncError,
    tokenSyncSuccess,
    retractLoading,
    retractError,
    retractSuccess
  } = useSelector(state => ({
    ...state.adminRegistration,
    token: state.auth.token
  }));
  const registrationTokens = tokens;

  useEffect(() => {
    if (!tokenSyncLoading && !tokenSyncSuccess && !tokenSyncError) {
      dispatch(adminRegistrationSyncTokens(token));
    }
  }, [dispatch, token, tokenSyncLoading, tokenSyncSuccess, tokenSyncError]);

  const onRefresh = () => {
    dispatch(adminRegistrationSyncTokens(token));
  };
  const onRetract = email => {
    dispatch(adminRegistrationRetract(token, email));
  };

  return (
    <RetractInvitationsPresenter
      loading={tokenSyncLoading || retractLoading}
      registrationTokens={registrationTokens}
      error={retractError || tokenSyncError}
      success={retractSuccess}
      onRefresh={onRefresh}
      onRetract={onRetract}
    />
  );
}

export default RetractInvitations;
