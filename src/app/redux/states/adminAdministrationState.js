/**
 * Initial state of the admin administration state
 */
const initialState = {
  permissions: [],
  roles: [],
  users: [],

  permissionsSyncLoading: false,
  permissionsSyncError: null,
  permissionsSyncSuccess: false,
  roleCreateLoading: false,
  roleCreateError: null,
  roleCreateSuccess: null,

  rolesSyncError: null,
  rolesSyncLoading: false,
  rolesSyncSuccess: false,
  roleDeleteError: null,
  roleDeleteLoading: false,
  roleDeleteSuccess: null,

  usersSyncError: null,
  usersSyncLoading: false,
  usersSyncSuccess: false
};

export default initialState;
