import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from '../../app/redux/actions/AuthActions';
import * as types from '../../app/redux/actionTypes';
import * as server from '../../app/redux/actions/serverConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* Responses */

const TOKEN = 'unique_token';

nock(server.SERVER, { reqheaders: { token: TOKEN } })
  .persist()
  .get(server.SERVER_SIGN_UP);

describe('sign out action creators', () => {
  it('should emit sign out action', () => {
    expect(actions.authSignOut()).toEqual({
      type: types.AUTH_SIGN_OUT
    });
  });
});

describe('sign up action creators', () => {
  it('creates BEGIN and SUCCESS when sign up done', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.authSignUp(
        {
          token: TOKEN,
          firstName: 'admin',
          lastName: 'admin',
          password: 'Abcd@123'
        },
        () => {}
      )
    );
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.AUTH_SIGN_UP_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.AUTH_SIGN_UP_FAILURE);
    expect(storeActions[1]).toHaveProperty('payload', {
      success: "Role 'NAME' created successfully."
    });
  });
  it('fails when invalid invitation token', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.authSignUp(
        {
          token: 'invalid',
          firstName: 'admin',
          lastName: 'admin',
          password: 'Abcd@123'
        },
        () => {}
      )
    );
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.AUTH_SIGN_UP_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.AUTH_SIGN_UP_FAILURE);
  });
});
