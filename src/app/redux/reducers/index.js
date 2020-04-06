import { combineReducers } from 'redux';

import { authReducer } from './AuthReducer';
import { adminRegistrationReducer } from './AdminRegistrationReducer';
import { adminAdministrationReducer } from './AdminAdministrationReducer';
import { adminLabManagementReducer } from './AdminLabManagementReducer';

export default combineReducers({
  auth: authReducer,
  adminRegistration: adminRegistrationReducer,
  adminAdministration: adminAdministrationReducer,
  adminLabManagement: adminLabManagementReducer
});
