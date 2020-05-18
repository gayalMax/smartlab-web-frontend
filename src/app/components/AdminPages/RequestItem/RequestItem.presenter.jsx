import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  TextField
} from '@material-ui/core';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import { Image } from 'cloudinary-react';
import { Formik, Form, Field } from 'formik';
import styles from './RequestItem.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import AdvancedTable from '../../Common/AdvancedTable';

const placeholder = 'https://via.placeholder.com/50';

function RequestItemPresenter({
  classes,
  items,
  error,
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
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>View Requested items</p>
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
        <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
          <SuccessErrorAlert success={null} error={error} />

          <Grid item>
            <Box px={2} pb={2}>
              Below the list of items are needed to get permission.
            </Box>
          </Grid>

          <Grid item>
            <AdvancedTable
              columns={[
                {
                  title: 'Serial Number',
                  field: 'serialNumber',
                  cellStyle: { paddingLeft: '0px' },
                  sorting: false,
                  render: row => (
                    <ListItem>
                      <ListItemText primary={row.serialNumber} />
                    </ListItem>
                  )
                },
                {
                  title: 'Itemset',
                  field: 'Itemset',
                  cellStyle: { paddingLeft: '0px' },
                  sorting: false,
                  render: row => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar variant="rounded" alt={row.ItemSet.id}>
                          {row.ItemSet.image == null ? (
                            <img src={placeholder} className={classes.image} alt={row.id} />
                          ) : (
                            <Image publicId={row.ItemSet.image} className={classes.image} />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={row.ItemSet.title} />
                    </ListItem>
                  )
                },
                {
                  title: 'Lab',
                  field: 'Lab',
                  cellStyle: { paddingLeft: '0px' },
                  sorting: false,
                  render: row => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar variant="rounded" alt={row.Lab.id}>
                          {row.Lab.image == null ? (
                            <img src={placeholder} className={classes.image} alt={row.id} />
                          ) : (
                            <Image publicId={row.Lab.image} className={classes.image} />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={row.Lab.title} />
                    </ListItem>
                  )
                },
                {
                  title: 'Attributes',
                  type: 'numeric',
                  cellStyle: { paddingLeft: '0px' },
                  sorting: false
                }
              ]}
              data={
                items &&
                items.map(({ id, serialNumber, ItemSet, Lab, ItemAttributes }) => ({
                  id,
                  serialNumber,
                  ItemSet,
                  Lab,
                  ItemAttributes
                }))
              }
              title=""
            />
          </Grid>
          <Grid item container direction="row" alignItems="center">
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
        <DialogTitle>Are you sure to reject the request</DialogTitle>
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
                    <Button
                      disabled={isSubmitting}
                      onClick={(submitForm, closeDialog)}
                      color="primary"
                      autoFocus
                    >
                      Reject
                    </Button>
                    <Button onClick={closeDialog} color="primary">
                      Cancel
                    </Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ProgressOverlay>
  );
}

RequestItemPresenter.defaultProps = {
  error: null
};

RequestItemPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(RequestItemPresenter);
