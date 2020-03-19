/**
 * Initial state of the auth state
 */
const initialState = {
  token: null,
  user: null,
  signIn: {
    loading: false,
    error: null
  },
  signUp: {
    requestingInvitation: false,
    loading: false,
    error: null,
    invitationOwner: null,
    invitationActivated: false
  }
};

export default initialState;
