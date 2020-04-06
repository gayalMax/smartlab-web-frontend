import { combineReducers } from 'redux';

import { authReducer } from './AuthReducer';
import { adminRegistrationReducer } from './AdminRegistrationReducer';
import { adminAdministrationReducer } from './AdminAdministrationReducer';
import { adminItemManagementReducer } from './AdminItemManagementReducer';

export default combineReducers({
  auth: authReducer,
  adminRegistration: adminRegistrationReducer,
  adminAdministration: adminAdministrationReducer,
  adminItemManagement: adminItemManagementReducer
});
