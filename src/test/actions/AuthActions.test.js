import * as actions from '../../app/redux/actions/AuthActions';
import * as types from '../../app/redux/actionTypes';

describe('sign out action creators', () => {
  it('should emit sign out action', () => {
    expect(actions.authSignOut()).toEqual({
      type: types.AUTH_SIGN_OUT
    });
  });
});
