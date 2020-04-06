import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  withStyles,
  Box,
  Chip,
  Avatar,
  Hidden,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AiOutlineMail } from 'react-icons/ai';

import styles from './EmailTextBox.styles';

const maxEmailThreshold = 5;

function EmailTextBoxPresenter({ classes, emails, error, onChange }) {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  return (
    <Box>
      <Grid>
        <Grid container direction="column" alignItems="stretch">
          <Grid item xs>
            <TextField
              onChange={onChange}
              label="Invitee Email List"
              multiline
              rows="4"
              placeholder="email1@mail.com&#13;&#10;email2@mail.com"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            {error && (
              <Box py={1}>
                <Alert severity="warning">{error}</Alert>
              </Box>
            )}
          </Grid>
          <Grid item>
            {emails.slice(0, maxEmailThreshold).map(email => (
              <Chip
                key={email}
                className={classes.chip}
                label={email}
                color="secondary"
                avatar={<Avatar>{email[0].toUpperCase()}</Avatar>}
              />
            ))}
          </Grid>
          <Grid item>
            <Box pt={1}>
              <Hidden xsUp={emails.length <= maxEmailThreshold}>
                <Button onClick={openDialog} variant="outlined">
                  Only&nbsp;
                  {maxEmailThreshold}
                  &nbsp;shown - &nbsp;
                  {emails.length}
                  &nbsp;distinct email addresses found.
                </Button>
              </Hidden>
            </Box>
          </Grid>
          <Dialog open={open} onClose={closeDialog} scroll="paper">
            <DialogTitle>Processed Email Addresses</DialogTitle>
            <Divider />
            <List>
              {emails.map(email => (
                <ListItem button key={email}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <AiOutlineMail />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={email} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <DialogActions>
              <Button onClick={closeDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

EmailTextBoxPresenter.defaultProps = {
  error: null
};

EmailTextBoxPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  emails: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(EmailTextBoxPresenter);
