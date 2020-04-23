import { adminAdministrationReducer as reducer } from '../../app/redux/reducers/AdminAdministrationReducer';
import * as types from '../../app/redux/actionTypes';
import initialState from '../../app/redux/states/adminAdministrationState';

describe('admin administration reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN', () => {
    const action = { type: types.ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN };
    const stateA = reducer({}, action);
    expect(stateA).toEqual({
      roleCreateLoading: true,
      roleCreateError: null,
      roleCreateSuccess: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS,
      payload: { success: 'role created successfully' }
    };
    const stateA = reducer(
      { roleCreateLoading: true, roleCreateError: null, roleCreateSuccess: null },
      action
    );
    expect(stateA).toEqual({
      roleCreateLoading: false,
      roleCreateError: null,
      roleCreateSuccess: 'role created successfully'
    });
  });

  it('should handle ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE,
      payload: { error: 'error creating role' }
    };
    const stateA = reducer(
      { roleCreateLoading: false, roleCreateError: null, roleCreateSuccess: null },
      action
    );
    expect(stateA).toEqual({
      roleCreateLoading: false,
      roleCreateError: 'error creating role',
      roleCreateSuccess: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_BEGIN', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_BEGIN
    };
    const stateA = reducer({}, action);
    expect(stateA).toEqual({
      permissions: [],
      permissionsSyncLoading: true,
      permissionsSyncSuccess: false,
      permissionsSyncError: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_SUCCESS,
      payload: { permissions: ['administrator'] }
    };
    const stateA = reducer(
      {
        permissions: [],
        permissionsSyncLoading: true,
        permissionsSyncSuccess: false,
        permissionsSyncError: null
      },
      action
    );
    expect(stateA).toEqual({
      permissions: ['administrator'],
      permissionsSyncLoading: false,
      permissionsSyncSuccess: true,
      permissionsSyncError: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_SYNC_PERMISSIONS_FAILURE,
      payload: { error: 'failed to sync permissions' }
    };
    const stateA = reducer(
      {
        permissions: [],
        permissionsSyncLoading: true,
        permissionsSyncSuccess: false,
        permissionsSyncError: null
      },
      action
    );
    expect(stateA).toEqual({
      permissions: [],
      permissionsSyncLoading: false,
      permissionsSyncSuccess: false,
      permissionsSyncError: 'failed to sync permissions'
    });
  });

  it('should handle ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN
    };
    const stateA = reducer({}, action);
    expect(stateA).toEqual({
      roles: [],
      rolesSyncLoading: true,
      rolesSyncSuccess: false,
      rolesSyncError: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_SYNC_ROLES_SUCCESS', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_SYNC_ROLES_SUCCESS,
      payload: { roles: ['administrator'] }
    };
    const stateA = reducer(
      {
        roles: [],
        rolesSyncLoading: true,
        rolesSyncSuccess: false,
        rolesSyncError: null
      },
      action
    );
    expect(stateA).toEqual({
      roles: ['administrator'],
      rolesSyncLoading: false,
      rolesSyncSuccess: true,
      rolesSyncError: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_SYNC_ROLES_FAILURE', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_SYNC_ROLES_FAILURE,
      payload: { error: 'failed to sync roles' }
    };
    const stateA = reducer(
      {
        roles: [],
        rolesSyncLoading: true,
        rolesSyncSuccess: false,
        rolesSyncError: null
      },
      action
    );
    expect(stateA).toEqual({
      roles: [],
      rolesSyncLoading: false,
      rolesSyncSuccess: false,
      rolesSyncError: 'failed to sync roles'
    });
  });

  it('should handle ADMIN_ADMINISTRATION_DELETE_ROLE_BEGIN', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_DELETE_ROLE_BEGIN
    };
    const stateA = reducer({}, action);
    expect(stateA).toEqual({
      roleDeleteLoading: true,
      roleDeleteSuccess: null,
      roleDeleteError: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_DELETE_ROLE_SUCCESS', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_DELETE_ROLE_SUCCESS,
      payload: { success: 'deleted role' }
    };
    const stateA = reducer(
      { roleDeleteLoading: true, roleDeleteSuccess: null, roleDeleteError: null },
      action
    );
    expect(stateA).toEqual({
      roleDeleteLoading: false,
      roleDeleteSuccess: 'deleted role',
      roleDeleteError: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_DELETE_ROLE_FAILURE', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_DELETE_ROLE_FAILURE,
      payload: { error: 'failed delete role' }
    };
    const stateA = reducer(
      { roleDeleteLoading: true, roleDeleteSuccess: null, roleDeleteError: null },
      action
    );
    expect(stateA).toEqual({
      roleDeleteLoading: false,
      roleDeleteSuccess: null,
      roleDeleteError: 'failed delete role'
    });
  });

  it('should handle ADMIN_ADMINISTRATION_SYNC_USERS_BEGIN', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_SYNC_USERS_BEGIN
    };
    const stateA = reducer({}, action);
    expect(stateA).toEqual({
      users: [],
      usersSyncLoading: true,
      usersSyncSuccess: false,
      usersSyncError: null
    });
  });

  it('should handle ADMIN_ADMINISTRATION_SYNC_USERS_SUCCESS', () => {
    const action = {
      type: types.ADMIN_ADMINISTRATION_SYNC_USERS_SUCCESS,
      payload: { users: [] }
    };
    const stateA = reducer(
      {
        users: [],
        usersSyncLoading: true,
        usersSyncSuccess: false,
        usersSyncError: null
      },
      action
    );
    expect(stateA).toEqual({
      users: [],
      usersSyncLoading: false,
      usersSyncSuccess: true,
      usersSyncError: null
    });
  });
});
