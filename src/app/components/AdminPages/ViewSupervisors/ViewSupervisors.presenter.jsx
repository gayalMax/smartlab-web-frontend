import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSync, AiOutlineDelete } from 'react-icons/ai';
import {
  Paper,
  Grid,
  withStyles,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Tooltip
} from '@material-ui/core';

import styles from './ViewSupervisors.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';

function ViewSupervisorsPresenter({
  classes,
  supervisors,
  error,
  loading,
  onRefresh,
  deleteSupervisor,
  success
}) {
  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>View Users</p>
              </Grid>
            </Grid>
            <Grid item>
              <Tooltip title="Refresh Supervisors List">
                <IconButton onClick={onRefresh}>
                  <AiOutlineSync />
                </IconButton>
              </Tooltip>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
          <SuccessErrorAlert success={success} error={error} />

          <Grid item>
            <Box px={2} pb={2}>
              Below the list of supervisors in the system are given. Invite Users to add supervisors
              to the syetem.
            </Box>
          </Grid>

          <Grid item>
            <AdvancedTable
              columns={[
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email' }
              ]}
              actions={[
                {
                  icon: () => <AiOutlineDelete />,
                  tooltip: 'Delete Supervisor',
                  onClick: (event, row) => deleteSupervisor(row)
                }
              ]}
              data={supervisors.map(({ id, firstName, lastName, email }) => ({
                id,
                name: `${firstName} ${lastName}`,
                email
              }))}
              title=""
            />
          </Grid>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

ViewSupervisorsPresenter.defaultProps = {
  error: null,
  success: null
};

ViewSupervisorsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  supervisors: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  deleteSupervisor: PropTypes.func.isRequired,
  success: PropTypes.string
};

export default withStyles(styles)(ViewSupervisorsPresenter);
