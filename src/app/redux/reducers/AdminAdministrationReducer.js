import produce from 'immer';

import {
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_BEGIN,
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE,
  ADMIN_ADMINISTRATION_CREATE_ROLE,
  ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN,
  ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS,
  ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE,
  ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN,
  ADMIN_ADMINISTRATION_SYNC_ROLES_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_ROLES_FAILURE,
  ADMIN_ADMINISTRATION_DELETE_ROLE,
  ADMIN_ADMINISTRATION_DELETE_ROLE_BEGIN,
  ADMIN_ADMINISTRATION_DELETE_ROLE_SUCCESS,
  ADMIN_ADMINISTRATION_DELETE_ROLE_FAILURE
} from '../actionTypes';
import initialState from '../states/adminAdministrationState';

/**
 * Administration state reducer
 * @param {Object} state current state of the application
 * @returns {Object} Altered state of the application
 */
const adminAdministrationReducer = produce((draft, { type, payload }) => {
  if (!draft) {
    return initialState;
  }

  switch (type) {
    // Syncing permissions
    case ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_BEGIN:
      draft.action = ADMIN_ADMINISTRATION_CREATE_ROLE;
      draft.success = false;
      draft.permissions = [];
      draft.error = null;
      draft.loading = true;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS:
      draft.permissions = payload.permissions;
      draft.loading = false;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    // Creating role
    case ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN:
      draft.action = ADMIN_ADMINISTRATION_CREATE_ROLE;
      draft.error = null;
      draft.success = false;
      draft.loading = true;
      return draft;
    case ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS:
      draft.loading = false;
      draft.success = true;
      return draft;
    case ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    // Syncing roles
    case ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN:
      draft.action = ADMIN_ADMINISTRATION_DELETE_ROLE;
      draft.success = false;
      draft.roles = [];
      draft.error = null;
      draft.loading = true;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_ROLES_SUCCESS:
      draft.roles = payload.roles;
      draft.loading = false;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_ROLES_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    // Delete Role
    case ADMIN_ADMINISTRATION_DELETE_ROLE_BEGIN:
      draft.action = ADMIN_ADMINISTRATION_DELETE_ROLE;
      draft.error = null;
      draft.success = false;
      draft.loading = true;
      return draft;
    case ADMIN_ADMINISTRATION_DELETE_ROLE_SUCCESS:
      draft.loading = false;
      draft.success = true;
      return draft;
    case ADMIN_ADMINISTRATION_DELETE_ROLE_FAILURE:
      draft.loading = false;
      draft.error = payload.error;
      return draft;
    default:
      return draft;
  }
});

export { adminAdministrationReducer, initialState };
