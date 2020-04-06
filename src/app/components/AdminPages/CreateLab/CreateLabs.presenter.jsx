import React from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles, Grid, Box, Button, AppBar, Toolbar } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import styles from './CreateLabs.styles';
import ProgressOverlay from '../../Common/ProgressOverlay';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import ImageUpload from '../../Common/ImageUpload';

function CreateLabsPresenter({ classes, onSubmit, validationSchema, loading, success, error }) {
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
        <Grid className={classes.wrapper} container direction="column" alignItems="stretch">
          <SuccessErrorAlert success={success} error={error} />
          <Grid item>
            <Box px={1} mb={2}>
              Create a lab with a suitable title and a subtitle. Uploading an image is &nbsp;
              <b>not required</b>
              &nbsp;
              <br />
              <b>Lab creation action cannot be undone.</b>
            </Box>
          </Grid>
          <Formik
            initialValues={{
              title: '',
              subTitle: '',
              image: null
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, setFieldValue }) => (
              <Form>
                <Grid className={classes.item} item>
                  <Field
                    component={TextField}
                    required
                    label="Enter Lab Title"
                    name="title"
                    variant="outlined"
                    type="text"
                    placeholder="advance lab"
                    fullWidth
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
                    placeholder="cse final year"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <ImageUpload
                    variant="outlined"
                    onSuccess={publicId => setFieldValue('image', publicId)}
                  />
                </Grid>
                <Grid item>
                  <Box pt={10} textAlign="right">
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
  onSubmit: PropTypes.func.isRequired,
  success: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(CreateLabsPresenter);
