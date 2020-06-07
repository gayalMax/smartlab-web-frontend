import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSync } from 'react-icons/ai';
import {
  Grid,
  withStyles,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  // ListItem,
  // ListItemText,
  Button,
  Paper
} from '@material-ui/core';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import { Image } from 'cloudinary-react';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field } from 'formik';
import styles from './RequestItem.styles';
import ProgressOverlay from '../Common/ProgressOverlay';
import SuccessErrorAlert from '../Common/SuccessErrorAlert';
import AdvancedTable from '../Common/AdvancedTable';

// const placeholder = 'https://via.placeholder.com/50';

function RequestItemPresenter({
  classes,
  items,
  error,
  success,
  loading,
  onRefresh,
  onAccept,
  validationSchema,
  onSubmit
}) {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  return (
    <ProgressOverlay visible={loading}>
      <Grid
        className={classes.root}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Paper>
          <Grid container direction="column" alignItems="center" className={classes.wrapper}>
            <SuccessErrorAlert success={success} error={error} />

            <Grid item>
              <Box px={4} pb={2}>
                <AppBar position="static" color="transparent" elevation={0}>
                  <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <p className={classes.title}> Requested Items</p>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Refresh Item List">
                        <IconButton onClick={onRefresh}>
                          <AiOutlineSync />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Toolbar>
                </AppBar>
              </Box>
            </Grid>

            <Grid item>
              <AdvancedTable
                columns={[
                  {
                    title: 'Item Id',
                    field: 'id',
                    cellStyle: { paddingLeft: '0px' },
                    sorting: false
                  },
                  {
                    title: 'Lab',
                    field: 'lab',
                    cellStyle: { paddingLeft: '0px' },
                    sorting: false
                  },
                  {
                    title: 'Reason',
                    field: 'reason',
                    cellStyle: { paddingLeft: '0px' },
                    sorting: false
                  },
                  {
                    title: 'Email Address',
                    field: 'user',
                    cellStyle: { paddingLeft: '0px' },
                    sorting: false
                  }
                ]}
                data={[
                  {
                    id: items.id,
                    reason: items.reason,
                    lab: items.Lab && items.Lab.title,
                    user: items.User && items.User.email
                  }
                ]}
                title=""
              />
            </Grid>

            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Box>
                  <Tooltip title="Accept the requested items">
                    <Button
                      className={classes.margin}
                      variant="contained"
                      color="primary"
                      onClick={onAccept}
                    >
                      Accept
                    </Button>
                  </Tooltip>
                  <Tooltip title="Reject the requested items">
                    <Button
                      className={classes.margin}
                      variant="contained"
                      color="primary"
                      onClick={openDialog}
                    >
                      Reject
                    </Button>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Dialog open={open} onClose={closeDialog} scroll="paper">
          <DialogTitle id="alert-dialog-title">Are you sure to reject the request</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please mention the reason to reject the request
              <br />
              <Formik
                initialValues={{
                  reason: ''
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ submitForm, isSubmitting }) => (
                  <Form>
                    <Grid className={classes.item} item>
                      <Field
                        component={TextField}
                        required
                        label="Enter The Reason"
                        name="reason"
                        variant="outlined"
                        type="text"
                        placeholder="Need it for next practical"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <Box textAlign="right">
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          onClick={() => {
                            submitForm();
                            closeDialog();
                          }}
                        >
                          Confirm
                        </Button>
                        <Button onClick={closeDialog} color="primary">
                          Cancel
                        </Button>
                      </Box>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    </ProgressOverlay>
  );
}

RequestItemPresenter.defaultProps = {
  error: null,
  success: null
};

RequestItemPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(RequestItemPresenter);
