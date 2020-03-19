import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Divider, InputAdornment } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Alert from '@material-ui/lab/Alert';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

import style from './SignInScreen.styles';
import ProgressOverlay from '../Common/ProgressOverlay';

function SignInScreenPresenter({ classes, validationSchema, onSubmit, error, loading }) {
  return (
    <ProgressOverlay visible={loading}>
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
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Card>
                  <CardContent className={classes.padding}>
                    <Grid className={classes.textField}>
                      <h2>Sign In</h2>
                      <p className={classes.paragraph}>
                        Please sign in to continue from where you left off
                      </p>
                      {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                    <Divider className={classes.margin} />
                    <Grid>
                      <Field
                        className={clsx(classes.margin, classes.textField)}
                        component={TextField}
                        required
                        name="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        placeholder="youremail@mail.com"
                        InputProps={{
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
                    <Grid className={classes.buttonGrid}>
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </CardContent>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </ProgressOverlay>
  );
}

SignInScreenPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  validationSchema: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

SignInScreenPresenter.defaultProps = {
  error: null
};

export default withStyles(style)(SignInScreenPresenter);
