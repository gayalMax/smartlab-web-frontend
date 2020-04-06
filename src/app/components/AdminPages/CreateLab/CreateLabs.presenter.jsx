import React from 'react';
import PropTypes from 'prop-types';
import styles from './CreateLabs.styles';
import { Paper, withStyles, Grid, Box, Button, AppBar, Toolbar } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
// import LabTitleBox from './LabTitleBox/LabTitleBox';
import * as EVENTS from './CreateLabs.events';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import ImageUpload from '../../Common/ImageUpload';

function CreateLabsPresenter({ classes, handleEvent, validationSchema, loading, success, error }) {
  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Create Labs</p>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid item>
          {/* if below is uncommented, then errors come when submitting */}
          <SuccessErrorAlert success={success} error={error} />
          <Formik
            initialValues={{
              title: '',
              subTitle: '',
              
            }}
            validationSchema={validationSchema}
            onSubmit={handleEvent(EVENTS.FORM_SUBMIT)}
          >
            {({ submitForm, isSubmitting, errors, touched }) => (
              <Form>
                <Grid className={classes.wrapper} container direction="column" alignItems="stretch">
                  <Grid className={classes.item} item>
                    <Field
                      component={TextField}
                      required
                      label="Enter Lab Title"
                      name="title"
                      variant="outlined"
                      type="text"
                      placeholder="DemoTitle"
                      onChange={handleEvent(EVENTS.TITLE_ON_CHANGE)}
                    />
                  </Grid>
                  <Grid className={classes.item} item>
                    <Field
                      component={TextField}
                      required
                      label="Enter Lab Subtitle"
                      name="subTitle"
                      variant="outlined"
                      type="text"
                      placeholder="DemoSubtitle"
                      onChange={handleEvent(EVENTS.TITLE_ON_CHANGE)}
                    />
                  </Grid>
                  <Grid item>
                    <p>
                      * If you are willing to add an image for the lab, please add that below.
                      <b>This is not required</b>
                    </p>
                  </Grid>
                  <Grid item>
                    <ImageUpload onSuccess={handleEvent(EVENTS.UPLOAD_IMAGE)} />
                  </Grid>
                  <Grid item>
                    <Box pt={10} pr={10} textAlign="right">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Create Lab
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}
CreateLabsPresenter.defaultProps = {
  error: null,
  success: null
};

CreateLabsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  handleEvent: PropTypes.func.isRequired,
  success: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(CreateLabsPresenter);
