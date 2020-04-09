import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from './AdminAdministrationActions';
import * as types from '../actionTypes';
import * as server from './serverConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* Responses */

const TOKEN = 'unique_token';

const responseRolesSync = {
  roles: [
    {
      id: '8837ddee-97fc-4a5c-af02-01bf6e6eab65',
      name: 'Student',
      RolePermissions: [{ name: 'REQUESTER' }]
    },
    {
      id: '5dae708f-550a-48eb-a3a8-46f4f316063b',
      name: 'Administrator',
      RolePermissions: [{ name: 'ADMINISTRATOR' }]
    }
  ]
};

/* Mock API Configurations */

nock(server.SERVER, { reqheaders: { token: TOKEN } })
  .persist()
  .get(server.SERVER_GET_ROLES_ALL)
  .reply(200, responseRolesSync);

/* Tests */

describe('role syncing action creator', () => {
  it('creates BEGIN and SUCCESS when fetching roles has been done', async () => {
    const expectedActions = [
      { type: types.ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN },
      { type: types.ADMIN_ADMINISTRATION_SYNC_ROLES_SUCCESS, payload: responseRolesSync }
    ];
    const store = mockStore({});
    await store.dispatch(actions.adminAdministrationSyncRoles(TOKEN));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('fails when invalid token', async () => {
    const store = mockStore({});
    await store.dispatch(actions.adminAdministrationSyncRoles('invalid'));
    const storeActions = store.getActions();

    expect(storeActions[0]).toEqual({ type: types.ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN });
    expect(storeActions[1].type).toEqual(types.ADMIN_ADMINISTRATION_SYNC_ROLES_FAILURE);
  });
});

module.exports = {};
