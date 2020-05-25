import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import {
  Divider,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Tooltip,
  Button,
  AppBar,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import {
  AiOutlineUser,
  AiOutlineLaptop,
  AiOutlineMail,
  AiOutlineMessage,
  AiOutlineClockCircle
} from 'react-icons/ai';
import { Image } from 'cloudinary-react';
import moment from 'moment';
import style from './SupervisorView.styles';
import ProgressOverlay from '../Common/ProgressOverlay';
import SuccessErrorAlert from '../Common/SuccessErrorAlert';
import { PageNotFound } from '../AdminPages';

function ListTile(props) {
  const { title, subtitle, icon } = props;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={subtitle} />
    </ListItem>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function SupervisorViewPresenter({
  classes,
  request,
  error,
  success,
  loading,
  onAccept,
  validationSchema,
  onSubmit
}) {
  const [value, setValue] = React.useState(0);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [acceptOpen, setAcceptOpen] = useState(false);

  const openDeclineDialog = () => setDeclineOpen(true);
  const closeDeclineDialog = () => setDeclineOpen(false);
  const openAcceptDialog = () => setAcceptOpen(true);
  const closeAcceptDialog = () => setAcceptOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (request.User === undefined) return <PageNotFound />;

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
        <SuccessErrorAlert success={success} error={error} />
        <Card className={classes.card}>
          <AppBar position="static" color="primary">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Basic Information" />
              <Tab label="Requested Items" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ListTile
              title={`${request.User.firstName} ${request.User.lastName}`}
              subtitle="Requested by"
              icon={<AiOutlineUser />}
            />
            <ListTile
              title={request.User.email}
              subtitle="Email Address"
              icon={<AiOutlineMail />}
            />
            <ListTile
              title={request.Lab.title}
              subtitle="Requested from Lab"
              icon={<AiOutlineLaptop />}
            />
            <ListTile
              title={moment(request.createdAt).fromNow()}
              subtitle="Requested on"
              icon={<AiOutlineClockCircle />}
            />
            <ListTile title={request.reason} subtitle="Reason" icon={<AiOutlineMessage />} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {request.RequestItems.map(ri => (
              <ListTile
                key={ri.itemId}
                title={ri.Item.ItemSet.title}
                subtitle={ri.Item.serialNumber}
                icon={
                  ri.Item.ItemSet.image ? (
                    <Image publicId={ri.Item.ItemSet.image} className={classes.image} />
                  ) : (
                    <AiOutlineLaptop />
                  )
                }
              />
            ))}
          </TabPanel>

          <Divider className={classes.margin} />
          {request.status === 'REQUESTED' && (
            <Grid item container direction="row" justify="center">
              <Tooltip title="Accept the requested items">
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="primary"
                  onClick={openAcceptDialog}
                >
                  Accept
                </Button>
              </Tooltip>
              <Box mx={1} />
              <Tooltip title="Reject the requested items">
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="secondary"
                  onClick={openDeclineDialog}
                >
                  Reject
                </Button>
              </Tooltip>
            </Grid>
          )}

          {request.status === 'DECLINED' && (
            <Grid item container direction="row" justify="center">
              <Box my={2}>
                <Button variant="outlined" color="secondary" onClick={() => {}}>
                  You already declined the request.
                  <br />
                  Reason:&nbsp;
                  {request.declineReason}
                </Button>
              </Box>
            </Grid>
          )}

          {request.status === 'ACCEPTED' && (
            <Grid item container direction="row" justify="center">
              <Box my={2}>
                <Button variant="outlined" color="primary" onClick={() => {}}>
                  You already accepted the request.
                </Button>
              </Box>
            </Grid>
          )}
        </Card>
      </Grid>

      <Dialog open={declineOpen} onClose={closeDeclineDialog}>
        <DialogTitle>Decline Request?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to decline this request. Please mention the reason to reject the
            request.
            <br />
            This action cannot be undone.
            <br />
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
                  <br />
                  <Grid item>
                    <Box textAlign="right">
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        onClick={() => {
                          submitForm();
                          closeDeclineDialog();
                        }}
                      >
                        Confirm
                      </Button>
                      <Button onClick={closeDeclineDialog} color="primary">
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

      <Dialog open={acceptOpen} onClose={closeAcceptDialog}>
        <DialogTitle>Accept Request?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to accept this request. The student will be able to retrieve items
            with approval from lab manager.
            <br />
            This action cannot be undone.
            <br />
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onAccept();
              closeAcceptDialog();
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
          <Button onClick={closeAcceptDialog} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </ProgressOverlay>
  );
}

ListTile.defaultProps = {
  subtitle: null
};

ListTile.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.any.isRequired
};

TabPanel.propTypes = {
  children: PropTypes.any.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

SupervisorViewPresenter.defaultProps = {
  error: null,
  success: null
};

SupervisorViewPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(style)(SupervisorViewPresenter);
