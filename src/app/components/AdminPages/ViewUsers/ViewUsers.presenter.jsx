import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSync } from 'react-icons/ai';
import {
  Paper,
  Grid,
  withStyles,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Tooltip,
  Chip,
  Button
} from '@material-ui/core';

import styles from './ViewUsers.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';

function ViewUsersPresenter({ classes, users, error, loading, onRefresh }) {
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
              <Tooltip title="Refresh Tokens List">
                <IconButton onClick={onRefresh}>
                  <AiOutlineSync />
                </IconButton>
              </Tooltip>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
          <SuccessErrorAlert success={null} error={error} />

          <Grid item>
            <Box px={2} pb={2}>
              Below the list of users in the system are given. Invite Users to add users to the
              syetem.
              <br />
              <Button href="/admin/users/invite" variant="outlined">
                Invite Users
              </Button>
            </Box>
          </Grid>

          <Grid item>
            <AdvancedTable
              columns={[
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email' },
                {
                  title: 'Role',
                  field: 'role',
                  type: 'numeric',
                  sorting: false,
                  render: row => <Chip size="small" label={row.role.toUpperCase()} />
                }
              ]}
              data={users.map(({ id, firstName, lastName, email, Role }) => ({
                id,
                name: `${firstName} ${lastName}`,
                email,
                role: Role.name
              }))}
              title=""
            />
          </Grid>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

ViewUsersPresenter.defaultProps = {
  error: null
};

ViewUsersPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default withStyles(styles)(ViewUsersPresenter);
