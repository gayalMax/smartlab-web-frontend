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
  labAssignSuccess: null
};

export default initialState;
