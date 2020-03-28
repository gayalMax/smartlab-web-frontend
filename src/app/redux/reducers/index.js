import { combineReducers } from 'redux';

import { authReducer } from './AuthReducer';
import { adminRegistrationReducer } from './AdminRegistrationReducer';
import { adminAdministrationReducer } from './AdminAdministrationReducer';

export default combineReducers({
  auth: authReducer,
  adminRegistration: adminRegistrationReducer,
  adminAdministration: adminAdministrationReducer
});
