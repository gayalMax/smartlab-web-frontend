import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  withStyles,
  Toolbar,
  AppBar,
  Box,
  Button,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  Typography
} from '@material-ui/core';
import { TextField, Checkbox } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';

import styles from './CreateRoles.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import { formatPermission } from '../../../helpers/helpers';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';

function WrappedCheckbox(key, value) {
  return (
    <Field
      type="checkbox"
      component={Checkbox}
      required
      name={key}
      value={value}
      variant="outlined"
    />
  );
}

function CreateRolesPresenter({
  classes,
  error,
  loading,
  success,
  permissions,
  validationSchema,
  onSubmit
}) {
  const staffPermissions = permissions.filter(item => item !== 'REQUESTER');

  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Create Roles</p>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
          <SuccessErrorAlert success={success} error={error} />
          <Grid item>
            <Box px={2} pb={2}>
              Select the permissions from the given options and give a name. Note that name of the
              role should be&nbsp;
              <b>unique.</b>
              &nbsp;You have to select at least one permission from the given list.
              <br />
              <b>Role creation action cannot be undone.</b>
            </Box>
          </Grid>

          <Grid item>
            <Formik
              initialValues={{
                name: '',
                permissions: []
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ submitForm, isSubmitting, errors, touched }) => (
                <Form>
                  <Grid container direction="column" alignContent="stretch">
                    <Grid item>
                      <Field
                        className={classes.margin}
                        component={TextField}
                        required
                        name="name"
                        label="Role Name"
                        variant="outlined"
                        type="text"
                        placeholder="DemoRole"
                        fullWidth
                      />
                    </Grid>
                    <FormControl
                      error={errors.permissions != null && touched.permissions != null}
                      component="fieldset"
                      className={classes.margin}
                    >
                      <FormLabel component="legend">Permissions*</FormLabel>
                      <FormGroup aria-label="position" row>
                        <Grid item container className={classes.margin}>
                          {staffPermissions.length === 0 ? (
                            <Typography>
                              Permission fetch failed. Please Reload the page.
                            </Typography>
                          ) : (
                            ''
                          )}
                          {staffPermissions.map(permission => (
                            <Grid item xs={12} sm={6} md={3} key={permission}>
                              <FormControlLabel
                                control={WrappedCheckbox('permissions', permission)}
                                label={formatPermission(permission)}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>
                      {errors.permissions && touched.permissions ? (
                        <FormHelperText>{errors.permissions}</FormHelperText>
                      ) : (
                        ''
                      )}
                    </FormControl>
                    <Grid item>
                      <Box py={1} textAlign="right">
                        <Button
                          className={classes.margin}
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          onClick={submitForm}
                        >
                          Create Role
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

CreateRolesPresenter.defaultProps = {
  error: null,
  success: null
};

CreateRolesPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  permissions: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(CreateRolesPresenter);
