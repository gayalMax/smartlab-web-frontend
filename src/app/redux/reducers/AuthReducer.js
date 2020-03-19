import produce from 'immer';

import {
  AUTH_SIGN_IN_BEGIN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_OUT,
  AUTH_REQUEST_INVITATION_BEGIN,
  AUTH_REQUEST_INVITATION_SUCCESS,
  AUTH_REQUEST_INVITATION_FAILURE,
  AUTH_SIGN_UP_BEGIN,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAILURE,
  AUTH_INVITATION_REDIRECTED
} from '../actionTypes';
import initialState from '../states/authState';

/**
 * Authentication state reducer
 * @param {Object} state current state of the application
 * @returns {Object} Altered state of the application
 */
const authReducer = produce((draft, { type, payload }) => {
  // Draft is null initially
  if (!draft) {
    return initialState;
  }

  switch (type) {
    // Sign in Action
    case AUTH_SIGN_IN_BEGIN:
      draft.token = null;
      draft.user = null;
      draft.signIn.loading = true;
      draft.signIn.error = null;
      return draft;
    case AUTH_SIGN_IN_SUCCESS:
      draft.token = payload.token;
      draft.user = payload.user;
      draft.signIn.loading = false;
      return draft;
    case AUTH_SIGN_IN_FAILURE:
      draft.signIn.loading = false;
      draft.signIn.error = payload.error;
      return draft;
    // Sign out Action
    case AUTH_SIGN_OUT:
      draft.token = null;
      draft.user = null;
      draft.signIn.loading = false;
      draft.signIn.error = null;
      return draft;
    // Request Invitation Action
    case AUTH_REQUEST_INVITATION_BEGIN:
      draft.signUp.invitationOwner = null;
      draft.signUp.requestingInvitation = true;
      draft.signUp.error = null;
      return draft;
    case AUTH_REQUEST_INVITATION_SUCCESS:
      draft.signUp.invitationOwner = payload;
      draft.signUp.requestingInvitation = false;
      return draft;
    case AUTH_REQUEST_INVITATION_FAILURE:
      draft.signUp.requestingInvitation = false;
      draft.signUp.error = payload.error;
      return draft;
    // Sign up Action
    case AUTH_SIGN_UP_BEGIN:
      draft.signUp.loading = true;
      draft.signUp.error = null;
      draft.signUp.invitationActivated = false;
      return draft;
    case AUTH_SIGN_UP_SUCCESS:
      draft.signUp.loading = false;
      draft.signUp.invitationActivated = true;
      return draft;
    case AUTH_SIGN_UP_FAILURE:
      draft.signUp.loading = false;
      draft.signUp.error = payload.error;
      return draft;
    case AUTH_INVITATION_REDIRECTED:
      draft.signUp.invitationActivated = false;
      return draft;
    default:
      return draft;
  }
});

export { authReducer, initialState };
