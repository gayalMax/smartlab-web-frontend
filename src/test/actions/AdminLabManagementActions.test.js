// import configureMockStore from 'redux-mock-store';
// import axios from 'axios';
// import thunk from 'redux-thunk';
// import nock from 'nock';

// import * as actions from '../../app/redux/actions/AdminLabManagementActions';
// import * as types from '../../app/redux/actionTypes';
// import * as server from '../../app/redux/actions/serverConstants';

// axios.defaults.adapter = require('axios/lib/adapters/http');

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// /* Responses */

// const TOKEN = 'unique_token';

// const responseLabCreate = {
//   id: '1b285de7-996c-49e7-9c4f-af774e9128d9',
//   title: 'lab_A',
//   subtitle: 'final year',
//   image: 'public/moyggcpsejjf66pynjxt',
//   updatedAt: ' 2020-04-15 00:49:48.149+05:30',
//   createdAt: '2020-04-15 00:49:48.149+05:30'
// };

// /* Mock API Configurations */

// nock(server.SERVER, { reqheaders: { token: TOKEN } })
//   .persist()
//   .get(server.SERVER_CREATE_LAB)
//   .reply(200, responseLabCreate);

// /* Tests */

// // adminLabManagementCreateLab
// describe('create labs action creators', () => {
//   it('creates BEGIN and SUCCESS when lab created', async () => {
//     const store = mockStore({});
//     await store.dispatch(
//       actions.adminLabManagementCreateLab(TOKEN, 'LabA', 'final year', null, () => {})
//     );
//     const storeActions = store.getActions();
//     expect(storeActions).toHaveLength(2);
//     console.log(storeActions[1]);
//     expect(storeActions[0]).toHaveProperty('type', types.ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN);
//     expect(storeActions[1]).toHaveProperty('type', types.ADMIN_LABMANAGEMENT_CREATE_LAB_SUCCESS);
//     expect(storeActions[1]).toHaveProperty('payload', responseLabCreate);
//   });
//   it('fails when invalid token', async () => {
//     const store = mockStore({});
//     await store.dispatch(
//       actions.adminLabManagementCreateLab(TOKEN, 'LabA', 'final year', null, () => {})
//     );
//     const storeActions = store.getActions();
//     expect(storeActions).toHaveLength(2);
//     expect(storeActions[0]).toHaveProperty('type', types.ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN);
//     expect(storeActions[1]).toHaveProperty('type', types.ADMIN_LABMANAGEMENT_CREATE_LAB_FAILURE);
//     console.log(storeActions[1].payload);
//   });
// });

import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from '../../app/redux/actions/AdminLabManagementActions';
import * as types from '../../app/redux/actionTypes';
import * as server from '../../app/redux/actions/serverConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* Responses */

const TOKEN = 'unique_token';

const responseLabCreate = {
  id: '1b285de7-996c-49e7-9c4f-af774e9128d9',
  title: 'lab_A',
  subtitle: 'final year',
  image: 'public/moyggcpsejjf66pynjxt',
  updatedAt: ' 2020-04-15 00:49:48.149+05:30',
  createdAt: '2020-04-15 00:49:48.149+05:30'
};

const responseSyncLabs = {
  labs: [
    {
      id: '15db28e7-996c-49e7-9c4f-af774e9128d9',
      title: 'lab_A',
      subtitle: 'final year',
      image: 'public/moyggcpsejjf66pynjxt',
      updatedAt: ' 2020-04-15 00:49:48.149+05:30',
      createdAt: '2020-04-15 00:49:48.149+05:30',
      Users: [{ email: 'admin@admin.com', firstName: 'admin', lastName: 'admin' }]
    },
    {
      id: '8b287de7-906c-49e7-9c4f-a91287fde749',
      title: 'lab_B',
      subtitle: 'second year',
      image: 'public/mf66nojjyxggsejtcp',
      updatedAt: ' 2020-04-15 00:49:48.149+05:30',
      createdAt: '2020-04-15 00:49:48.149+05:30',
      Users: [{ email: 'admin@admin.com', fisrtName: 'admin', lastName: 'admin' }]
    }
  ]
};

/* Mock API Configurations */

nock(server.SERVER, { reqheaders: { token: TOKEN } })
  .persist()
  .post(server.SERVER_CREATE_LAB)
  .reply(200, responseLabCreate)
  .get(server.SERVER_SYNC_LAB)
  .reply(200, responseSyncLabs);

/* Tests */

// adminLabManagementCreateLab
describe('create labs action creators', () => {
  it('creates BEGIN and SUCCESS when lab created', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.adminLabManagementCreateLab(TOKEN, 'labA', 'finalyear', null, () => {})
    );
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.ADMIN_LABMANAGEMENT_CREATE_LAB_SUCCESS);
    expect(storeActions[1]).toHaveProperty('payload', {
      success: 'Lab labA created successfully!'
    });
  });
  it('fails when invalid token', async () => {
    const store = mockStore({});
    await store.dispatch(
      actions.adminLabManagementCreateLab('invalid', 'labA', 'finalyear', null, () => {})
    );
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.ADMIN_LABMANAGEMENT_CREATE_LAB_FAILURE);
  });
});

// adminLabManagementSyncLabs
describe('labs syncing action creators', () => {
  it('creates BEGIN and SUCCESS when labs has been done', async () => {
    const store = mockStore({});
    await store.dispatch(actions.adminLabManagementSyncLabs(TOKEN));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.ADMIN_LAB_MANAGEMENT_SYNC_LABS_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.ADMIN_LAB_MANAGEMENT_SYNC_LABS_FAILURE);
    expect(storeActions[1]).toHaveProperty('payload', { responseSyncLabs });
  });
  it('fails when invalid token', async () => {
    const store = mockStore({});
    await store.dispatch(actions.adminLabManagementSyncLabs('invalid'));
    const storeActions = store.getActions();
    expect(storeActions).toHaveLength(2);
    expect(storeActions[0]).toHaveProperty('type', types.ADMIN_LAB_MANAGEMENT_SYNC_LABS_BEGIN);
    expect(storeActions[1]).toHaveProperty('type', types.ADMIN_LAB_MANAGEMENT_SYNC_LABS_FAILURE);
  });
});

module.exports = {};
