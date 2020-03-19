import {
  ADMIN_REGISTRATION_INVITE_BEGIN,
  ADMIN_REGISTRATION_INVITE_SUCCESS,
  ADMIN_REGISTRATION_INVITE_FAILURE
} from '../../actionTypes';

/**
 * Action creator for beginning of inviting users
 * @param {string} invitationToken Invitation token key
 * @returns Redux action
 */
const adminRegistrationInviteBegin = () => ({
  type: ADMIN_REGISTRATION_INVITE_BEGIN
});

/**
 * Action creator for end of inviting users.
 * This is fired when API call ends in a success.
 * @param {Object} response Response data of the call
 * @param {Object[]} response.roles Roles list
 * @param {string} response.roles.id Id of the role
 * @param {string} response.roles.name Name of the role
 * @returns Redux action
 */
const adminRegistrationInviteSuccess = () => ({
  type: ADMIN_REGISTRATION_INVITE_SUCCESS
});

/**
 * Action creator for end of inviting users.
 * This is fired when API call ends in an error.
 * @param {string} error Error message
 * @returns Redux action
 */
const adminRegistrationInviteFailure = error => ({
  type: ADMIN_REGISTRATION_INVITE_FAILURE,
  payload: { error }
});

/**
 * Request roles details thunk creator.
 *
 * This is an action that will do the API call and fire other actions.
 * @returns Thunk for user sign in API call
 */
export default function adminRegistrationInvite(token, emails, role) {
  return async dispatch => {
    // API call initialized
    dispatch(adminRegistrationInviteBegin());

    // Validate emails
    if (!emails || emails.length === 0) {
      dispatch(adminRegistrationInviteFailure('No email addresses submitted'));
      return;
    }
    // Validate role
    if (!role || role.length === 0) {
      dispatch(adminRegistrationInviteFailure('Role not selected'));
      return;
    }

    // Function to call if ended in error
    function onError(error) {
      let message;
      if (error) message = error.data.message;
      if (!message) message = 'Server connection failed';
      dispatch(adminRegistrationInviteFailure(message));
    }

    // Function to call if ended in success
    function onSuccess() {
      try {
        dispatch(adminRegistrationInviteSuccess());
      } catch (err) {
        dispatch(
          adminRegistrationInviteFailure('Server connection failed. Please check your connection.')
        );
      }
    }

    try {
      // TODO: Make the request
      if (token == null) throw Error('Not Authorized');
      onSuccess();
    } catch (error) {
      onError(error.response);
    }
  };
}
