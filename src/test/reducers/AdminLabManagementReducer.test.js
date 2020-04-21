import { adminLabManagementReducer as reducer } from '../../app/redux/reducers/AdminLabManagementReducer';
import * as types from '../../app/redux/actionTypes';
import initialState from '../../app/redux/states/adminLabManagementState';

describe('admin lab management reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN', () => {
    const action = { type: types.ADMIN_LABMANAGEMENT_CREATE_LAB_BEGIN };
    const stateA = reducer(
      { labCreationLoading: false, labCreationError: null, labCreationSuccess: null },
      action
    );
    expect(stateA).toEqual({
      labCreationLoading: true,
      labCreationError: null,
      labCreationSuccess: null
    });
  });

  it('should handle ADMIN_LABMANAGEMENT_CREATE_LAB_SUCCESS', () => {
    const action = {
      type: types.ADMIN_LABMANAGEMENT_CREATE_LAB_SUCCESS,
      payload: { success: 'lab created success' }
    };
    const stateA = reducer(
      { labCreationLoading: true, labCreationError: null, labCreationSuccess: null },
      action
    );
    expect(stateA).toEqual({
      labCreationLoading: false,
      labCreationError: null,
      labCreationSuccess: 'lab created success'
    });
  });

  it('should handle ADMIN_LABMANAGEMENT_CREATE_LAB_FAILURE', () => {
    const action = {
      type: types.ADMIN_LABMANAGEMENT_CREATE_LAB_FAILURE,
      payload: { error: 'lab created failed' }
    };
    const stateA = reducer(
      { labCreationLoading: true, labCreationError: null, labCreationSuccess: null },
      action
    );
    expect(stateA).toEqual({
      labCreationLoading: false,
      labCreationError: 'lab created failed',
      labCreationSuccess: null
    });
  });

  it('should handle ADMIN_LAB_MANAGEMENT_SYNC_LABS_BEGIN', () => {
    const action = { type: types.ADMIN_LAB_MANAGEMENT_SYNC_LABS_BEGIN };
    const stateA = reducer(
      { labs: [], labsSyncLoading: false, labsSyncError: null, labsSyncSuccess: null },
      action
    );
    expect(stateA).toEqual({
      labs: [],
      labsSyncLoading: true,
      labsSyncError: null,
      labsSyncSuccess: false
    });
  });

  it('should handle ADMIN_LAB_MANAGEMENT_SYNC_LABS_SUCCESS', () => {
    const action = {
      type: types.ADMIN_LAB_MANAGEMENT_SYNC_LABS_SUCCESS,
      payload: {
        labs: [
          {
            Users: [],
            updatedAt: '2020-04-15 00:49:48.149+05:30',
            createdAt: '2020-04-15 00:49:48.149+05:30',
            image: 'public/moyggcpsejjf66pynjxt',
            subtitle: '2nd year',
            title: 'lab2',
            id: '90e8b4bb-10ba-4b1b-9fe0-0371971a1b24'
          },
          {
            id: '8b287de7-906c-49e7-9c4f-a91287fde749',
            title: 'lab_B',
            subtitle: 'second year',
            image: 'public/mf66nojjyxggsejtcp',
            updatedAt: '2020-04-15 00:49:48.149+05:30',
            createdAt: '2020-04-15 00:49:48.149+05:30',
            Users: []
          }
        ]
      }
    };
    const stateA = reducer(
      { labs: [], labsSyncLoading: true, labsSyncError: null, labsSyncSuccess: false },
      action
    );
    expect(stateA).toEqual({
      labs: [
        {
          Users: [],
          updatedAt: '2020-04-15 00:49:48.149+05:30',
          createdAt: '2020-04-15 00:49:48.149+05:30',
          image: 'public/moyggcpsejjf66pynjxt',
          subtitle: '2nd year',
          title: 'lab2',
          id: '90e8b4bb-10ba-4b1b-9fe0-0371971a1b24'
        },
        {
          id: '8b287de7-906c-49e7-9c4f-a91287fde749',
          title: 'lab_B',
          subtitle: 'second year',
          image: 'public/mf66nojjyxggsejtcp',
          updatedAt: '2020-04-15 00:49:48.149+05:30',
          createdAt: '2020-04-15 00:49:48.149+05:30',
          Users: []
        }
      ],
      labsSyncLoading: false,
      labsSyncError: null,
      labsSyncSuccess: true
    });
  });

  it('should handle ADMIN_LAB_MANAGEMENT_SYNC_LABS_FAILURE', () => {
    const action = {
      type: types.ADMIN_LAB_MANAGEMENT_SYNC_LABS_FAILURE,
      payload: { error: 'sync labs failed' }
    };
    const stateA = reducer(
      { labs: [], labsSyncLoading: false, labsSyncError: null, labsSyncSuccess: null },
      action
    );
    expect(stateA).toEqual({
      labs: [],
      labsSyncLoading: false,
      labsSyncError: 'sync labs failed',
      labsSyncSuccess: null
    });
  });
});
