import { adminAdministrationReducer as reducer } from '../../app/redux/reducers/AdminAdministrationReducer';
import * as types from '../../app/redux/actionTypes';
import initialState from '../../app/redux/states/adminAdministrationState';

describe('admin administration reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN', () => {
    const action = { type: types.ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN };

    // No state
    const stateA = reducer({}, action);
    expect(stateA).toEqual({
      roleCreateLoading: true,
      roleCreateError: null,
      roleCreateSuccess: null
    });

    // Loading state
    const stateB = reducer(
      {
        roleCreateLoading: true,
        roleCreateError: null,
        roleCreateSuccess: null
      },
      action
    );
    expect(stateB).toEqual({
      roleCreateLoading: true,
      roleCreateError: null,
      roleCreateSuccess: null
    });

    // Success and Error state
    const stateC = reducer(
      {
        roleCreateLoading: true,
        roleCreateError: 'Demo Error',
        roleCreateSuccess: 'Demo Success'
      },
      action
    );
    expect(stateC).toEqual({
      roleCreateLoading: true,
      roleCreateError: null,
      roleCreateSuccess: null
    });
  });
});
