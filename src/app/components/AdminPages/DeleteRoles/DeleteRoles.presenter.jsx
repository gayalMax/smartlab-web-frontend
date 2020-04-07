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
  Chip
} from '@material-ui/core';

import styles from './DeleteRoles.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';

function DeleteRolesPresenter({ classes, roles, error, loading, onRefresh }) {
  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Delete Roles</p>
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
              Below the list of roles in the system are given. When inviting new user, you can now
              select the role from following list.
            </Box>
          </Grid>

          <Grid item>
            <AdvancedTable
              columns={[
                { title: 'Role', field: 'name' },
                {
                  title: 'Permissions',
                  type: 'numeric',
                  sorting: false,
                  render: row =>
                    row.RolePermissions.map(permission => (
                      <Chip
                        style={{ margin: '2px' }}
                        key={permission.name}
                        size="small"
                        label={permission.name}
                      />
                    ))
                }
              ]}
              data={roles.map(({ name, RolePermissions }) => ({ name, RolePermissions }))}
              title=""
            />
          </Grid>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

DeleteRolesPresenter.defaultProps = {
  error: null
};

DeleteRolesPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteRolesPresenter);
