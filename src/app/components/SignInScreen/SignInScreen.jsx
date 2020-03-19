import React from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authSignIn } from '../../redux/actions/AuthActions';
import SignInScreenPresenter from './SignInScreen.presenter';

/**
 * User sign in screen smart component
 */
function SignInScreen() {
  // Schema of the expected user inputs
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email')
      .required('Required'),
    password: yup.string().required('Required')
  });

  // To emit sign in events
  const dispatch = useDispatch();

  // Current form state
  const { signIn, user } = useSelector(state => state.auth);
  const { error, loading } = signIn;

  // If logged in(user != null) redirect to admin panel
  if (user) {
    return <Redirect push to="/admin/dashboard" />;
  }

  // On submit callback - setSubmitting is used to disable the form during async call
  const onSubmit = (values, { setSubmitting }) => {
    // Callback to enable form after async call
    const complete = () => setSubmitting(false);
    // Sign in action dispatch
    dispatch(authSignIn(values, complete));
  };

  // Associated dumb component
  return (
    <SignInScreenPresenter
      validationSchema={schema}
      error={error}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}

export default SignInScreen;
