import persistState from 'redux-localstorage';
import { createDraft, finishDraft } from 'immer';

import initialState from './redux/states';

/**
 * Class which determines what parts of the state to persist
 */
class StorePersistance {
  /**
   * Loads into the draft from the current state.
   * The draft will then be persisted on local storage.
   * The draft will be copied using immer.
   *
   * Notice - draft is empty at the function start.
   * So always be careful when setting nested parameters.
   *
   * Eg: `draft.a = {}` should come beofore than `draft.a.b = 9`
   * since draft.a is undefined.
   * @param {Object} currentState Current state object(Don't mutate this)
   * @param {Draft} draft Draft state (Change this to persist)
   */
  static storeToDraft(currentState, draft) {
    // Auth state - token and user information
    draft.auth = {};
    draft.auth.token = currentState.auth.token;
    draft.auth.user = currentState.auth.user;
    return draft;
  }

  /**
   * Loads data from persisted storage into state.
   *
   * Notice: draft is the current state at the start.
   * So, unlike in `storeToDraft`, DO NOT set sections to {}.
   * Just set the individual values.
   * @param {Object} persistedState Object from local storage(Don't mutate this)
   * @param {Draft} draft Draft state (Change this to load into state)
   */
  static loadToDraft(persistedState, draft) {
    // Auth state - token and user information
    draft.auth.token = persistedState.auth.token || initialState.auth.token;
    draft.auth.user = persistedState.auth.user || initialState.auth.token;
    return draft;
  }

  /**
   *  Create a slice from state to be stored in local storage.
   * This is the driver function of storeToDraft.
   * @param {Object} state Current state object
   */
  static slicerFn(state) {
    if (!state) return null;
    const draft = createDraft({});
    const slicedState = StorePersistance.storeToDraft(state, draft);
    return finishDraft(slicedState);
  }

  /**
   * Merges current state and persisted state.
   * Driver function of loadToDraft
   * @param {Object} currentState Current state object
   * @param {Object} persistedState State from local storage
   */
  static merge(currentState, persistedState) {
    if (!persistedState) return currentState;
    const draft = createDraft(initialState);
    const mergedState = StorePersistance.loadToDraft(persistedState, draft);
    return finishDraft(mergedState);
  }

  /**
   * Helper function to pass into configs of storageMiddleware.
   * It requires a callback and this produces a callback from slicerFn.
   */
  static slicer() {
    return state => StorePersistance.slicerFn(state);
  }
}

/**
 * Storage middleware configs
 */
const config = { key: 'state', slicer: StorePersistance.slicer, merge: StorePersistance.merge };

/**
 * Storage middleware which data is persisted to.
 */
const storageMiddleware = persistState(null, config);

export default storageMiddleware;
