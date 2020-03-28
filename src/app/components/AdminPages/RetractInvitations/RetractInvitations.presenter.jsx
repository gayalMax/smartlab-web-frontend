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
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import moment from 'moment';

import styles from './RetractInvitations.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';

function RetractInviationsPresenter({
  classes,
  registrationTokens,
  error,
  loading,
  success,
  onRefresh,
  onRetract
}) {
  const [selectedEmail, setSelectedEmail] = React.useState(null);

  const handleClick = email => () => {
    setSelectedEmail(email);
  };

  const handleDialogClose = () => {
    setSelectedEmail(null);
  };

  const handleRetract = () => {
    if (selectedEmail !== null) {
      onRetract(selectedEmail);
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
                <p className={classes.title}>Retract Invitations</p>
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
                <Alert severity="success">Invitation was successfully retracted.</Alert>
              </Box>
            )}
          </Grid>

          <Grid item>
            <Box px={2} pb={2}>
              Retract Invitations by clicking the button.
              <br />
              Note that users with accepted invitations&nbsp;
              <b>cannot be removed.</b>
              <br />
              <b>Retracting action cannot be undone.</b>
            </Box>
          </Grid>

          <Grid item>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Email Address</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {registrationTokens.map(row => (
                    <TableRow key={row.email}>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell>
                        <Chip
                          variant="outlined"
                          color="primary"
                          avatar={<Avatar>{row.Role.name[0]}</Avatar>}
                          label={row.Role.name}
                        />
                      </TableCell>
                      <TableCell>
                        <i>{moment(row.updatedAt).fromNow()}</i>
                      </TableCell>
                      <TableCell align="right">
                        {row.valid ? (
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleClick(row.email)}
                            startIcon={<AiOutlineDelete />}
                          >
                            Retract
                          </Button>
                        ) : (
                          <Button variant="text" disabled>
                            Invitation Accepted
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
        open={selectedEmail !== null}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Retract Invitation?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you retract the invitation, the user won&apos;t be able to register. If the user had
            already recieved the invitation, the token will be invalidated.
            <br />
            This action cannot be undone.
            <br />
            <br />
            Email Address:&nbsp;
            <b>{selectedEmail}</b>
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

RetractInviationsPresenter.defaultProps = {
  error: null
};

RetractInviationsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  registrationTokens: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onRetract: PropTypes.func.isRequired
};

export default withStyles(styles)(RetractInviationsPresenter);
