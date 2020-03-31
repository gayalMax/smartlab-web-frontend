/**
 * Initial state of the admin registration state
 */
const initialState = {
  tokens: [],
  roles: [],

  rolesSyncLoading: false,
  rolesSyncError: null,
  rolesSyncSuccess: false,
  inviteLoading: false,
  inviteError: null,
  inviteSuccess: null,

  tokenSyncLoading: false,
  tokenSyncError: null,
  tokenSyncSuccess: false,
  retractLoading: false,
  retractError: null,
  retractSuccess: null
};

export default initialState;
