import authInitialState from './authState';
import labManagementState from  './adminLabManagementState'

const initialState = {
  auth: authInitialState,
  lab : labManagementState
};

export default initialState;
