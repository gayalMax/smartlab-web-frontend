import produce from 'immer';

import {
  ADMIN_REGISTRATION_SYNC_ROLES_BEGIN,
  ADMIN_REGISTRATION_SYNC_ROLES_SUCCESS,
  ADMIN_REGISTRATION_SYNC_ROLES_FAILURE,
  ADMIN_REGISTRATION_INVITE_BEGIN,
  ADMIN_REGISTRATION_INVITE_SUCCESS,
  ADMIN_REGISTRATION_INVITE_FAILURE,
  ADMIN_REGISTRATION_SYNC_TOKENS_FAILURE,
  ADMIN_REGISTRATION_SYNC_TOKENS_SUCCESS,
  ADMIN_REGISTRATION_SYNC_TOKENS_BEGIN,
  ADMIN_REGISTRATION_RETRACTION_BEGIN,
  ADMIN_REGISTRATION_RETRACTION_SUCCESS,
  ADMIN_REGISTRATION_RETRACTION_FAILURE
} from '../actionTypes';
import initialState from '../states/adminRegistrationState';

/**
 * Authentication state reducer
 * @param {Object} state current state of the application
 * @returns {Object} Altered state of the application
 */
const adminRegistrationReducer = produce((draft, { type, payload }) => {
  // Draft is null initially
  if (!draft) {
    return initialState;
  }

  switch (type) {
    // Syncing roles
    case ADMIN_REGISTRATION_SYNC_ROLES_BEGIN:
      draft.roles = [];
      draft.rolesSyncLoading = true;
      draft.rolesSyncSuccess = false;
      draft.rolesSyncError = null;
      return draft;
    case ADMIN_REGISTRATION_SYNC_ROLES_SUCCESS:
      draft.rolesSyncLoading = false;
      draft.rolesSyncSuccess = true;
      draft.roles = payload.roles;
      return draft;
    case ADMIN_REGISTRATION_SYNC_ROLES_FAILURE:
      draft.rolesSyncLoading = false;
      draft.rolesSyncError = payload.error;
      return draft;

    // Submit invitations
    case ADMIN_REGISTRATION_INVITE_BEGIN:
      draft.inviteLoading = true;
      draft.inviteError = null;
      draft.inviteSuccess = null;
      return draft;
    case ADMIN_REGISTRATION_INVITE_SUCCESS:
      draft.inviteLoading = false;
      draft.inviteSuccess = payload.success;
      return draft;
    case ADMIN_REGISTRATION_INVITE_FAILURE:
      draft.inviteLoading = false;
      draft.inviteError = payload.error;
      return draft;

    // Syncing tokens
    case ADMIN_REGISTRATION_SYNC_TOKENS_BEGIN:
      draft.tokens = [];
      draft.tokenSyncLoading = true;
      draft.tokenSyncSuccess = false;
      draft.tokenSyncError = null;
      return draft;
    case ADMIN_REGISTRATION_SYNC_TOKENS_SUCCESS:
      draft.tokens = payload.tokens;
      draft.tokenSyncLoading = false;
      draft.tokenSyncSuccess = true;
      return draft;
    case ADMIN_REGISTRATION_SYNC_TOKENS_FAILURE:
      draft.tokenSyncLoading = false;
      draft.tokenSyncError = payload.error;
      return draft;

    // Submit Retraction
    case ADMIN_REGISTRATION_RETRACTION_BEGIN:
      draft.retractLoading = true;
      draft.retractSuccess = null;
      draft.retractError = null;
      return draft;
    case ADMIN_REGISTRATION_RETRACTION_SUCCESS:
      draft.retractLoading = false;
      draft.retractSuccess = payload.success;
      return draft;
    case ADMIN_REGISTRATION_RETRACTION_FAILURE:
      draft.retractLoading = false;
      draft.retractError = payload.error;
      return draft;
    default:
      return draft;
  }
});

export { adminRegistrationReducer, initialState };
