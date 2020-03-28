import produce from 'immer';

import {
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_BEGIN,
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS,
  ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE,
  ADMIN_ADMINISTRATION_CREATE_ROLES
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
      draft.action = ADMIN_ADMINISTRATION_CREATE_ROLES;
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
    default:
      return draft;
  }
});

export { adminAdministrationReducer, initialState };
