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

const responseCreateRole = {
  id: '1a706073-2bec-4a58-84df-b7bf1ce7682a',
  name: 'instructor',
  permissions: ['REGISTRAR']
};

/* Mock API Configurations */

nock(server.SERVER, { reqheaders: { token: TOKEN } })
  .persist()
  .get(server.SERVER_GET_ROLES_ALL)
  .reply(200, responseRolesSync)
  .post(server.SERVER_CREATE_ROLE)
  .reply(200, responseCreateRole);

/* Tests */

// adminAdministrationSyncRoles
describe('role syncing action creator', () => {
  it('creates BEGIN and SUCCESS when fetching roles has been done', async () => {
    const store = mockStore({});
    await store.dispatch(actions.adminAdministrationSyncRoles(TOKEN));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.ADMIN_ADMINISTRATION_SYNC_ROLES_SUCCESS);
    expect(storeActions[1]).toHaveProperty('payload', responseRolesSync);
  });
  it('fails when invalid token', async () => {
    const store = mockStore({});
    await store.dispatch(actions.adminAdministrationSyncRoles('invalid'));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.ADMIN_ADMINISTRATION_SYNC_ROLES_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.ADMIN_ADMINISTRATION_SYNC_ROLES_FAILURE);
  });
});

// adminAdministrationCreateRole
describe('create role action creator', () => {
  it('creates BEGIN and SUCCESS when role created', async () => {
    const store = mockStore({});
    await store.dispatch(actions.adminAdministrationCreateRole(TOKEN, 'NAME', null, () => {}));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.ADMIN_ADMINISTRATION_CREATE_ROLE_SUCCESS);
    expect(storeActions[1]).toHaveProperty('payload', {
      success: "Role 'NAME' created successfully."
    });
  });
  it('fails when invalid token', async () => {
    const store = mockStore({});
    await store.dispatch(actions.adminAdministrationCreateRole('invalid', 'NAME', null, () => {}));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toEqual({ type: types.ADMIN_ADMINISTRATION_CREATE_ROLE_BEGIN });
    expect(storeActions[1].type).toEqual(types.ADMIN_ADMINISTRATION_CREATE_ROLE_FAILURE);
  });
});

module.exports = {};
