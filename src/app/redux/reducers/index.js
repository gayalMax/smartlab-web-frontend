import { combineReducers } from 'redux';

import { authReducer } from './AuthReducer';
import { adminRegistrationReducer } from './AdminRegistrationReducer';
import { adminAdministrationReducer } from './AdminAdministrationReducer';
import { adminLabReducer } from './AdminLabReducer';

export default combineReducers({
  adminLab: adminLabReducer,
  auth: authReducer,
  adminRegistration: adminRegistrationReducer,
  adminAdministration: adminAdministrationReducer
});
