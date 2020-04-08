import React, { useState } from 'react';
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
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

import styles from './DeleteRoles.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';

function DeleteRolesPresenter({ classes, roles, error, success, loading, onRefresh, onDelete }) {
  const [selectedRole, setSelectedRole] = useState({});

  const handleDialogClose = () => {
    setSelectedRole({});
  };

  const handleDelete = () => {
    if (selectedRole !== null) {
      onDelete(selectedRole);
    }
    handleDialogClose();
  };

  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Manage Roles</p>
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
          <SuccessErrorAlert success={success} error={error} />

          <Grid item>
            <Box px={2} pb={2}>
              Below the list of roles in the system are given. When inviting new user, you can now
              select the role from following list. You may also delete roles. However, currently you
              can delete only the roles without any users.
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
              actions={[
                {
                  icon: () => <AiOutlineDelete />,
                  tooltip: 'Delete Role',
                  onClick: (event, row) => setSelectedRole(row)
                }
              ]}
              data={roles.map(({ id, name, RolePermissions }) => ({ id, name, RolePermissions }))}
              title=""
            />
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={selectedRole.id != null}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Role</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can delete a role if and only if there are no users assigned to this role. If you
            try to delete a role with assigned users, the action will fail.
            <br />
            This action cannot be undone.
            <br />
            <br />
            Delete Role&nbsp;
            <b>{selectedRole.name}</b>
            <span>&nbsp;?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ProgressOverlay>
  );
}

DeleteRolesPresenter.defaultProps = {
  error: null,
  success: null
};

DeleteRolesPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteRolesPresenter);
