import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Grid,
  withStyles,
  Toolbar,
  AppBar,
  Box,
  Button,
  Fab,
  GridList,
  GridListTile,
  FormControlLabel,
  IconButton
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, Switch } from 'formik-material-ui';
import { Formik, Form, Field, FieldArray } from 'formik';

import styles from './CreateItemsets.styles';
import ImageUpload from '../../Common/ImageUpload';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';

function CreateItemSetsPresenter({ classes, error, success, validationSchema, onSubmit }) {
  return (
    <Paper className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <p className={classes.title}>Create Itemsets</p>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
        <SuccessErrorAlert success={success} error={error} />
        <Grid item>
          <Box px={2} pb={2}>
            Provide a title, image(optional) and attribute name, value pairs.
            <b>A non editable attribute should have a default value.</b>
          </Box>
        </Grid>
        <Grid>
          <Formik
            initialValues={{
              title: '',
              image: null,
              attributes: [
                {
                  key: '',
                  defaultValue: '',
                  editable: false
                }
              ]
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ submitForm, isSubmitting, setFieldValue, values }) => (
              <Form>
                <Grid container direction="column" alignContent="stretch">
                  <Grid item>
                    <Field
                      className={classes.margin}
                      component={TextField}
                      required
                      name="title"
                      label="Itemset title"
                      variant="outlined"
                      type="text"
                      placeholder="title"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Box pl={1} py={2}>
                      <ImageUpload onSuccess={publicId => setFieldValue('image', publicId)} />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box px={2} pb={2} pt={2}>
                      <b>Add attributes to the itemset</b>
                    </Box>
                  </Grid>
                  <FieldArray
                    name="attributes"
                    render={
                      arrayHelpers => (
                        <div>
                          {values.attributes.map((attribute, index) => (
                            <GridList key={index.toString()} cols={12} cellHeight="auto">
                              <GridListTile cols={4.75}>
                                <Field
                                  className={classes.margin}
                                  component={TextField}
                                  required
                                  name={`attributes.${index}.key`}
                                  label="Attribute Name"
                                  variant="outlined"
                                  type="text"
                                  placeholder="key"
                                  fullWidth
                                />
                              </GridListTile>

                              <GridListTile cols={4.75}>
                                <Field
                                  className={classes.margin}
                                  component={TextField}
                                  required
                                  name={`attributes.${index}.defaultValue`}
                                  label="Default Value"
                                  variant="outlined"
                                  type="text"
                                  placeholder="defaultValue"
                                  fullWidth
                                />
                              </GridListTile>
                              <GridListTile cols={1.75}>
                                <Box py={2} px={2}>
                                  <FormControlLabel
                                    control={
                                      // eslint-disable-next-line react/jsx-wrap-multilines
                                      <Field
                                        component={Switch}
                                        name={`attributes.${index}.editable`}
                                        type="checkbox"
                                      />
                                    }
                                    label="Editable"
                                  />
                                </Box>
                              </GridListTile>
                              <GridListTile cols={0.75}>
                                {values.attributes.length > 1 ? (
                                  <Box py={1} textAlign="right">
                                    <IconButton
                                      className={classes.margin}
                                      aria-label="delete"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Box>
                                ) : (
                                  ''
                                )}
                              </GridListTile>
                            </GridList>
                          ))}
                          <Grid item>
                            <Box pb={2} textAlign="right">
                              <Fab
                                color="primary"
                                aria-label="add"
                                onClick={
                                  () =>
                                    arrayHelpers.push({
                                      key: '',
                                      defaultValue: '',
                                      editable: false
                                    })
                                  // eslint-disable-next-line react/jsx-curly-newline
                                }
                              >
                                <AddIcon />
                              </Fab>
                            </Box>
                          </Grid>
                        </div>
                      )
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  />

                  <Grid item>
                    <Box py={1} textAlign="right">
                      <Button
                        className={classes.margin}
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Create Itemset
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Paper>
  );
}

CreateItemSetsPresenter.defaultProps = {
  error: null,
  success: null
};

CreateItemSetsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  success: PropTypes.string,
  error: PropTypes.string,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(CreateItemSetsPresenter);
