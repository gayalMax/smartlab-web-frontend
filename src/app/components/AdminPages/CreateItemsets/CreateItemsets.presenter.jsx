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
  GridList,
  GridListTile,
  FormControlLabel,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, Switch } from 'formik-material-ui';
import { Formik, Form, Field, FieldArray } from 'formik';
import { AiOutlinePlusSquare } from 'react-icons/ai';

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
            Provide a title, image (optional) and attribute name, value pairs.&nbsp;
            <b>A non editable attribute should have a default value.</b>
            When creating items, default value will be allowed to change if the field is marked as
            editable.
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
                  <Box px={2} py={1}>
                    Uploading image is optional, but will aid in identifying the item set later. The
                    same image will be given to the items created using this item set.
                  </Box>
                  <Grid item>
                    <Box pl={1} py={1}>
                      <ImageUpload
                        variant="outlined"
                        onSuccess={publicId => setFieldValue('image', publicId)}
                      />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box px={2} py={1}>
                      Key should be unique. If the key is duplicated, the later field will be used.
                      If a field is marked an editable, default value is not required.
                      <br />
                      You have to enter at least one attribute.
                    </Box>
                  </Grid>
                  <FieldArray
                    name="attributes"
                    render={arrayHelpers => (
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
                        <Button
                          className={classes.margin}
                          variant="outlined"
                          startIcon={<AiOutlinePlusSquare />}
                          onClick={() =>
                            arrayHelpers.push({
                              key: '',
                              defaultValue: '',
                              editable: false
                            })
                          }
                        >
                          Add new attribute
                        </Button>
                      </div>
                    )}
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
