import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Divider, InputAdornment, TextField as MuiTextField, Box } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Alert from '@material-ui/lab/Alert';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import style from './SignUpScreen.styles';
import ProgressOverlay from '../Common/ProgressOverlay';
import informationTextLines from './SignUpScreen.helpers';

function SignUpScreenPresenter({ classes, validationSchema, onSubmit, signUpPageState }) {
  const { invitationOwner, requestingInvitation, loading, error } = signUpPageState;

  // Get email and role name with empty strings as default
  let email = '';
  let roleName = '';
  if (invitationOwner) {
    email = invitationOwner.email;
    roleName = invitationOwner.Role.name;
  }

  return (
    <ProgressOverlay visible={requestingInvitation || loading}>
      <Grid
        className={classes.root}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              password: '',
              retypePassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Card>
                  <Box mx={1}>
                    <CardContent className={classes.padding}>
                      <Grid className={classes.textField}>
                        <h2>Complete Your Registration</h2>
                        <p className={classes.paragraph}>
                          {informationTextLines(roleName, loading || requestingInvitation)}
                        </p>
                        {error && <Alert severity="error">{error}</Alert>}
                      </Grid>
                      <Divider className={classes.margin} />
                      <Grid>
                        <MuiTextField
                          className={clsx(classes.margin, classes.textField)}
                          disabled
                          value={email}
                          label="Email"
                          variant="outlined"
                          type="email"
                          placeholder="Token invalid"
                          InputProps={{
                            readOnly: true,
                            startAdornment: (
                              <InputAdornment position="start">
                                <AiOutlineMail />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid>
                        <Field
                          className={clsx(classes.margin, classes.textField)}
                          component={TextField}
                          required
                          name="firstName"
                          label="First Name"
                          variant="outlined"
                          type="text"
                          placeholder="John"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AiOutlineUser />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid>
                        <Field
                          className={clsx(classes.margin, classes.textField)}
                          component={TextField}
                          required
                          name="lastName"
                          label="Last Name"
                          variant="outlined"
                          type="text"
                          placeholder="Doe"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AiOutlineUser />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid>
                        <Field
                          className={clsx(classes.margin, classes.textField)}
                          component={TextField}
                          required
                          name="password"
                          label="Password"
                          variant="outlined"
                          type="password"
                          placeholder="mypassword"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AiOutlineLock />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid>
                        <Field
                          className={clsx(classes.margin, classes.textField)}
                          component={TextField}
                          required
                          name="retypePassword"
                          label="Retype Password"
                          variant="outlined"
                          type="password"
                          placeholder="mypassword"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AiOutlineLock />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid className={classes.buttonGrid}>
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={isSubmitting}
                          onClick={submitForm}
                        >
                          Register
                        </Button>
                      </Grid>
                    </CardContent>
                  </Box>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </ProgressOverlay>
  );
}

SignUpScreenPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  validationSchema: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  signUpPageState: PropTypes.object.isRequired
};

export default withStyles(style)(SignUpScreenPresenter);
