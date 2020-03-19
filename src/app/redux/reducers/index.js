import { combineReducers } from 'redux';

import { authReducer } from './AuthReducer';
import { adminRegistrationReducer } from './AdminRegistrationReducer';

export default combineReducers({
  auth: authReducer,
  adminRegistration: adminRegistrationReducer
});
