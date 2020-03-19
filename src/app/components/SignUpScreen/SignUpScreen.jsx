import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

import {
  authSignUp,
  authRequestInvitation,
  authInvitationRedirected
} from '../../redux/actions/AuthActions';
import SignUpScreenPresenter from './SignUpScreen.presenter';

// Validation schema of user form input
const schema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  password: yup.string().required('Required'),
  // Retype password should be equal to password
  retypePassword: yup
    .string()
    .oneOf([yup.ref('password'), null, ''], 'Passwords must match')
    .required('Required')
});

/**
 * User sign up screen smart component
 */
function SignUpScreen({ history }) {
  // To dispatch sign up actions
  const dispatch = useDispatch();
  // Required state
  const {
    requestingInvitation,
    loading,
    error,
    invitationActivated,
    invitationOwner
  } = useSelector(state => state.auth.signUp);

  // Get token from path parameter(address)
  const { registrationToken } = useParams();

  // Run token verify method on startup
  // If invitation accepted, they will be redirected. so don't run for them.
  useEffect(() => {
    if (invitationActivated) {
      dispatch(authInvitationRedirected());
      history.push('/login');
    } else {
      dispatch(authRequestInvitation(registrationToken));
    }
  }, [invitationActivated, registrationToken, dispatch, history]);

  // On form submit callback
  const onSubmit = (values, { setSubmitting }) => {
    // When completed, redirect to login page
    const complete = () => {
      setSubmitting(false);
    };

    // Register
    dispatch(
      authSignUp(
        {
          token: registrationToken,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password
        },
        complete
      )
    );
  };

  // Associated dumb component
  return (
    <SignUpScreenPresenter
      validationSchema={schema}
      onSubmit={onSubmit}
      signUpPageState={{
        requestingInvitation,
        error,
        loading,
        invitationOwner
      }}
    />
  );
}

SignUpScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(SignUpScreen);
