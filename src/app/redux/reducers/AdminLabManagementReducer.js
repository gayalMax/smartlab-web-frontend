import produce from 'immer';
import {
  ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN,
  ADMIN_LABMANAGEMENT_CREATE_LAB_SUCCESS,
  ADMIN_LABMANAGEMENT_CREATE_LAB_FAILURE
} from '../actionTypes';
import initialState from '../states/adminLabManagementState';

/**
 * LabManagement state reducer
 * @param {Object} state current state of the application
 * @returns {Object} Altered state of the application
 */

const adminLabManagementReducer = produce((draft, { type, payload }) => {
  // Draft is null initially
  if (!draft) {
    return initialState;
  }
  switch (type) {
    case ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN:
      draft.labCreationLoading = true;
      draft.labCreationError = null;
      draft.labCreationSuccess = null;
      return draft;
    case ADMIN_LABMANAGEMENT_CREATE_LAB_SUCCESS:
      draft.labCreationLoading = false;
      draft.labCreationSuccess = payload.success;
      return draft;
    case ADMIN_LABMANAGEMENT_CREATE_LAB_FAILURE:
      draft.labCreationLoading = false;
      draft.labCreationError = payload.error;
      return draft;
    default:
      return draft;
  }
});

export { adminLabManagementReducer, initialState };
