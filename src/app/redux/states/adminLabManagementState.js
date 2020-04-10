/*
 * Initial state of lab creation state
 */

const initialState = {
  labs: [],
  managers: [],

  labCreationLoading: false,
  labCreationError: null,
  labCreationSuccess: null,

  labsSyncLoading: false,
  labsSyncError: null,
  labsSyncSuccess: null,

  managersSyncLoading: false,
  managersSyncError: null,
  managersSyncSuccess: null,

  labAssignLoading: false,
  labAssignError: null,
  labAssignSuccess: null,

  labUnAssignLoading: false,
  labUnAssignError: null,
  labUnAssignSuccess: null
};

export default initialState;
