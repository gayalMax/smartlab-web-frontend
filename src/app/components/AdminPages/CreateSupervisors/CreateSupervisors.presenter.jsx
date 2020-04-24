import React from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles, Grid, Box, Button, AppBar, Toolbar } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import styles from './CreateSupervisors.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';

function CreateSupervisorsPresenter({
  classes,
  onSubmit,
  validationSchema,
  loading,
  success,
  error
}) {
  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Add Supervisor</p>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid className={classes.wrapper} container direction="column" alignItems="stretch">
          <SuccessErrorAlert success={success} error={error} />
          <Grid item>
            <Box px={1} mb={2}>
              Add supervisor to the system by adding them to the email list.
            </Box>
          </Grid>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: ''
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Grid className={classes.item} item>
                  <Field
                    component={TextField}
                    required
                    label="Enter Supervisor First Name"
                    name="firstName"
                    variant="outlined"
                    type="text"
                    placeholder="John"
                    fullWidth
                  />
                </Grid>
                <Grid className={classes.item} item>
                  <Field
                    component={TextField}
                    required
                    label="Enter Supervisor Last Name"
                    name="lastName"
                    variant="outlined"
                    type="text"
                    placeholder="Doe"
                    fullWidth
                  />
                </Grid>
                <Grid className={classes.item} item>
                  <Field
                    component={TextField}
                    required
                    label="Enter Supervisor Email"
                    name="email"
                    variant="outlined"
                    type="text"
                    placeholder="johndoe@ois.com"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Box textAlign="right">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Add Supervisor
                    </Button>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

CreateSupervisorsPresenter.defaultProps = {
  error: null,
  success: null
};

CreateSupervisorsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  success: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(CreateSupervisorsPresenter);
