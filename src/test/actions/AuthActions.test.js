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

const responseSignedIn = {
  token: TOKEN,
  user: {
    id: '1a706073-2bec-4a58-84df-b7bf1ce7682a',
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    permissions: ['REGISTRAR'],
    role: 'administrator',
    roleId: '4357893b-b799-4fec-a818-9bb1737c4eb0'
  }
};

const responseAuthRequestInvitation = {
  email: 'admin@admin.com',
  Role: { name: 'administrator' },
  roleId: '4357893b-b799-4fec-a818-9bb1737c4eb0'
};

nock(server.SERVER, { reqheaders: { token: TOKEN } })
  .persist()
  .post(server.SERVER_SIGN_UP)
  .reply(200, '')
  .post(server.SERVER_SIGN_IN)
  .reply(200, responseSignedIn)
  .get(server.SERVER_REQUEST_INVITATION / TOKEN)
  .reply(200, responseAuthRequestInvitation);

describe('sign out action creators', () => {
  it('should emit sign out action', () => {
    expect(actions.authSignOut()).toEqual({
      type: types.AUTH_SIGN_OUT
    });
  });
});
// signUp
describe('sign up action creators', () => {
  it('creates BEGIN and SUCCESS when sign up done', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.authSignUp(
        {
          token: TOKEN,
          email: 'admin@admin.com',
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
    // expect(storeActions[1]).toHaveProperty('type', types.AUTH_SIGN_UP_SUCCESS);
  });
  it('fails when invalid invitation token', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.authSignUp(
        {
          token: 'invalid',
          email: 'admin@admin.com',
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

// AuthActionsSignIn

describe('sign in action creators', () => {
  it('creates BEGIN and SUCCESS when signed in', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.authSignIn(
        {
          email: 'admin@admin.com',
          password: 'Abcd@123'
        },
        () => {}
      )
    );
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    // expect(storeActions[0]).toHaveProperty('type', types.AUTH_SIGN_IN_BEGIN);
    // expect(storeActions[1]).toHaveProperty('type', types.AUTH_SIGN_IN_SUCCESS);
  });
  it('fails when invalid email', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.authSignIn(
        {
          email: 'invalid@invalid.com',
          password: 'Abcd@123'
        },
        () => {}
      )
    );
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    // expect(storeActions[0]).toHaveProperty('type', types.AUTH_SIGN_UP_BEGIN);
    // expect(storeActions[1]).toHaveProperty('type', types.AUTH_SIGN_UP_FAILURE);
  });
  it('fails when invalid password', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.authSignIn(
        {
          email: 'invalid@admin.com',
          password: 'invalidPassword'
        },
        () => {}
      )
    );
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    // expect(storeActions[0]).toHaveProperty('type', types.AUTH_SIGN_UP_BEGIN);
    // expect(storeActions[1]).toHaveProperty('type', types.AUTH_SIGN_UP_FAILURE);
  });
});

// authRequestInvitation
describe('request invitation action creators', () => {
  it('creates BEGIN and SUCCESS when fetching invitations requested', async () => {
    const store = mockStore({});
    await store.dispatch(actions.authRequestInvitation(TOKEN));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.AUTH_REQUEST_INVITATION_BEGIN);
    // expect(storeActions[1]).toHaveProperty('type', types.AUTH_REQUEST_INVITATION_SUCCESS);
    // expect(storeActions[1]).toHaveProperty('payload', responseAuthRequestInvitation);
  });
  it('fails when invalid invitation token', async () => {
    const store = mockStore({});
    await store.dispatch(actions.authRequestInvitation('invalidToken'));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.AUTH_REQUEST_INVITATION_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.AUTH_REQUEST_INVITATION_FAILURE);
  });
});

describe(' redirect user action creators', () => {
  it('should emit redirection action', async () => {
    const store = mockStore({});
    await store.dispatch(actions.authInvitationRedirected());
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(1);
    expect(storeActions[0]).toHaveProperty('type', types.AUTH_INVITATION_REDIRECTED);
  });
});
