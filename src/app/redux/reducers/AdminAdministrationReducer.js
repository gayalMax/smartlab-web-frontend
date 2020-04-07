import produce from 'immer';

import {
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_BEGIN,
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE,
  ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN,
  ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS,
  ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE,
  ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN,
  ADMIN_ADMINISTRATION_SYNC_ROLES_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_ROLES_FAILURE,
  ADMIN_ADMINISTRATION_DELETE_ROLE_BEGIN,
  ADMIN_ADMINISTRATION_DELETE_ROLE_SUCCESS,
  ADMIN_ADMINISTRATION_DELETE_ROLE_FAILURE,
  ADMIN_ADMINISTRATION_SYNC_USERS_FAILURE,
  ADMIN_ADMINISTRATION_SYNC_USERS_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_USERS_BEGIN
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
      draft.permissions = [];
      draft.permissionsSyncLoading = true;
      draft.permissionsSyncSuccess = false;
      draft.permissionsSyncError = null;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS:
      draft.permissions = payload.permissions;
      draft.permissionsSyncLoading = false;
      draft.permissionsSyncSuccess = true;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE:
      draft.permissionsSyncLoading = false;
      draft.permissionsSyncError = payload.error;
      return draft;
    // Creating role
    case ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN:
      draft.roleCreateLoading = true;
      draft.roleCreateSuccess = null;
      draft.roleCreateError = null;
      return draft;
    case ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS:
      draft.roleCreateLoading = false;
      draft.roleCreateSuccess = payload.success;
      return draft;
    case ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE:
      draft.roleCreateLoading = false;
      draft.roleCreateError = payload.error;
      return draft;

    // Syncing roles
    case ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN:
      draft.roles = [];
      draft.rolesSyncLoading = true;
      draft.rolesSyncSuccess = false;
      draft.rolesSyncError = null;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_ROLES_SUCCESS:
      draft.roles = payload.roles;
      draft.rolesSyncLoading = false;
      draft.rolesSyncSuccess = true;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_ROLES_FAILURE:
      draft.rolesSyncLoading = false;
      draft.rolesSyncError = payload.error;
      return draft;
    // Delete Role
    case ADMIN_ADMINISTRATION_DELETE_ROLE_BEGIN:
      draft.roleDeleteLoading = true;
      draft.roleDeleteSuccess = null;
      draft.roleDeleteError = null;
      return draft;
    case ADMIN_ADMINISTRATION_DELETE_ROLE_SUCCESS:
      draft.roleDeleteLoading = false;
      draft.roleDeleteSuccess = payload.success;
      return draft;
    case ADMIN_ADMINISTRATION_DELETE_ROLE_FAILURE:
      draft.roleDeleteLoading = false;
      draft.roleDeleteError = payload.error;
      return draft;

    // Syncing users
    case ADMIN_ADMINISTRATION_SYNC_USERS_BEGIN:
      draft.users = [];
      draft.usersSyncLoading = true;
      draft.usersSyncSuccess = false;
      draft.usersSyncError = null;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_USERS_SUCCESS:
      draft.users = payload.users;
      draft.usersSyncLoading = false;
      draft.usersSyncSuccess = true;
      return draft;
    case ADMIN_ADMINISTRATION_SYNC_USERS_FAILURE:
      draft.usersSyncLoading = false;
      draft.usersSyncError = payload.error;
      return draft;
    default:
      return draft;
  }
});

export { adminAdministrationReducer, initialState };
