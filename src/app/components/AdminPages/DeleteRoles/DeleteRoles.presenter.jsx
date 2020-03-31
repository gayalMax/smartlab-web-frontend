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
  Tooltip,
  Button,
  TableRow,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';

import styles from './DeleteRoles.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';

function DeleteRolesPresenter({ classes, roles, error, loading, success, onRefresh, onDelete }) {
  const [selectedRole, setSelectedRole] = React.useState({});

  const handleClick = role => () => {
    setSelectedRole(role);
  };

  const handleDialogClose = () => {
    setSelectedRole({});
  };

  const handleRetract = () => {
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
          <SuccessErrorAlert success={success} error={error} />

          <Grid item>
            <Box px={2} pb={2}>
              Delete roles by clicking the button. Note that primitive roles such as
              Student/Administrator&nbsp;
              <b>cannot be deleted.</b>
              <br />
              <b>Deleting action cannot be undone.</b>
            </Box>
          </Grid>

          <Grid item>
            <TableContainer>
              <Table className={classes.table} aria-label="roles tab;e" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Role</TableCell>
                    <TableCell>Permissions</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {row.RolePermissions.map(permission => (
                          <Chip key={permission.name} size="small" label={permission.name} />
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        {row.name === 'Student' || row.name === 'Administrator' ? (
                          <Button variant="text" disabled>
                            Cannot Delete
                          </Button>
                        ) : (
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClick(row)}
                            startIcon={<AiOutlineDelete />}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={selectedRole.id != null}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Role?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you retract the invitation, the user who were using the role will get minimum roles
            and will be logged out.
            <br />
            This action cannot be undone.
            <br />
            <br />
            Role:&nbsp;
            <b>{selectedRole.name}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRetract} color="primary" autoFocus>
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
  loading: PropTypes.bool.isRequired,
  success: PropTypes.string,
  onRefresh: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default withStyles(styles)(DeleteRolesPresenter);
