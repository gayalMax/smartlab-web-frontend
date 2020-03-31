import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSync } from 'react-icons/ai';
import {
  Paper,
  Grid,
  Button,
  withStyles,
  Toolbar,
  AppBar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Tooltip
} from '@material-ui/core';

import styles from './InviteUsers.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import EmailTextBox from './EmailTextBox/EmailTextBox';
import * as EVENTS from './InviteUsers.events';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';

function InviteUsersPresenter({ classes, roles, error, loading, handleEvent, success }) {
  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Invite Users</p>
              </Grid>
            </Grid>
            <Grid item>
              <Tooltip title="Refresh Roles List">
                <IconButton onClick={handleEvent(EVENTS.REFRESH_ROLES)}>
                  <AiOutlineSync />
                </IconButton>
              </Tooltip>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
          <SuccessErrorAlert success={success} error={error} />

          <EmailTextBox onChange={handleEvent(EVENTS.EMAILS_ONCHANGE)} />
          <Grid item>
            <p>
              Put all the emails into the box above and press&nbsp;
              <b>Send Invitation Emails</b>
              .&nbsp;
              <br />
              You can add only one email to invite one user.
              <br />
              Users indicated above will be sent invites. Use one email per line for best
              identification.
            </p>
          </Grid>
          <Grid item>
            <Box pb={2} pt={1}>
              <FormControl variant="outlined" className={classes.formControl} fullWidth>
                <InputLabel id="role-select-label">Role to be given</InputLabel>
                <Select
                  labelId="role-select-label"
                  label="Role to be given"
                  defaultValue=""
                  onChange={handleEvent(EVENTS.ROLE_ONCHANGE)}
                >
                  {roles.map(role => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <Box py={1} textAlign="right">
              <Button onClick={handleEvent(EVENTS.FORM_SUBMIT)} variant="contained" color="primary">
                Send Invitation Emails
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

InviteUsersPresenter.defaultProps = {
  error: null,
  success: null
};

InviteUsersPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleEvent: PropTypes.func.isRequired
};

export default withStyles(styles)(InviteUsersPresenter);
