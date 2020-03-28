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
  ADMIN_REGISTRATION_RETRACTION_FAILURE,
  ADMIN_REGISTRATION_RETRACTION,
  ADMIN_REGISTRATION_INVITE
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
      draft.success = false;
      draft.roles = [];
      draft.error = null;
      draft.loading = true;
      return draft;
    case ADMIN_REGISTRATION_SYNC_ROLES_SUCCESS:
      draft.roles = payload.roles;
      draft.loading = false;
      return draft;
    case ADMIN_REGISTRATION_SYNC_ROLES_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    // Submit invitations
    case ADMIN_REGISTRATION_INVITE_BEGIN:
      draft.action = ADMIN_REGISTRATION_INVITE;
      draft.error = null;
      draft.success = false;
      draft.loading = true;
      return draft;
    case ADMIN_REGISTRATION_INVITE_SUCCESS:
      draft.loading = false;
      draft.success = true;
      return draft;
    case ADMIN_REGISTRATION_INVITE_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    // Syncing tokens
    case ADMIN_REGISTRATION_SYNC_TOKENS_BEGIN:
      draft.tokens = [];
      draft.error = null;
      draft.loading = true;
      return draft;
    case ADMIN_REGISTRATION_SYNC_TOKENS_SUCCESS:
      draft.tokens = payload.tokens;
      draft.loading = false;
      return draft;
    case ADMIN_REGISTRATION_SYNC_TOKENS_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    // Submit Retraction
    case ADMIN_REGISTRATION_RETRACTION_BEGIN:
      draft.action = ADMIN_REGISTRATION_RETRACTION;
      draft.error = null;
      draft.success = false;
      draft.loading = true;
      return draft;
    case ADMIN_REGISTRATION_RETRACTION_SUCCESS:
      draft.loading = false;
      draft.success = true;
      return draft;
    case ADMIN_REGISTRATION_RETRACTION_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    default:
      return draft;
  }
});

export { adminRegistrationReducer, initialState };
