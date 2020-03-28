import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Grid, withStyles, Toolbar, AppBar, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import styles from './CreateRoles.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';

function CreateRolesPresenter({ classes, error, loading, success, permissions }) {
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
          <Grid item>
            {error && (
              <Box pb={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
          </Grid>
          <Grid item>
            {success && (
              <Box pb={2}>
                <Alert severity="success">Role successfully created.</Alert>
              </Box>
            )}
          </Grid>
          {permissions}
          <Grid item>ddd</Grid>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

CreateRolesPresenter.defaultProps = {
  error: null
};

CreateRolesPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  permissions: PropTypes.array.isRequired
};

export default withStyles(styles)(CreateRolesPresenter);
