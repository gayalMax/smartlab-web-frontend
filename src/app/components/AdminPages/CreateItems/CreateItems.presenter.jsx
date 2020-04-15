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
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField, Select as SelectFormik } from 'formik-material-ui';
import { Formik, Form, Field, FieldArray } from 'formik';
import { AiOutlinePlusSquare } from 'react-icons/ai';

import styles from './CreateItems.styles';
import SuccessErrorAlert from '../../Common/SuccessErrorAlert';
import ProgressOverlay from '../../Common/ProgressOverlay';
import RealTimeReader from '../../Common/RealTimeReader';

function CreateItemsPresenter({
  classes,
  itemsets,
  labs,
  validationSchema,
  error,
  success,
  loading,
  onSubmit
}) {
  return (
    <ProgressOverlay visible={loading}>
      <Paper className={classes.root}>
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <p className={classes.title}>Create Items</p>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" alignItems="stretch" className={classes.wrapper}>
          <SuccessErrorAlert success={success} error={error} />
          <Grid item>
            <Box px={2} pb={2}>
              Provide a serial number, an itemset, a lab that the item belongs and the attributes of
              the item.&nbsp;
              <b>You can alter the values of the editable attributes of the itemset attributes</b>
            </Box>
          </Grid>
          <Grid>
            <Formik
              initialValues={{
                serialNumber: '',
                itemset: '',
                lab: '',
                attributes: []
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ submitForm, isSubmitting, values, setFieldValue }) => {
                const changeItemset = event => {
                  itemsets.forEach(itemset => {
                    if (itemset.id === event.target.value) {
                      const attributes = itemset.Attributes.map(attribute => {
                        return {
                          key: attribute.key,
                          value: attribute.defaultValue,
                          editable: attribute.editable,
                          itemsetAttribute: true
                        };
                      });
                      setFieldValue('itemset', itemset.id);
                      setFieldValue('attributes', attributes);
                    }
                  });
                };

                const onBarcode = code => setFieldValue('serialNumber', code);

                return (
                  <Form>
                    <Grid container direction="column" alignContent="stretch">
                      <Grid item style={{ marginBottom: '10px' }}>
                        <Field
                          className={classes.margin}
                          component={TextField}
                          required
                          name="serialNumber"
                          label="Serial Number"
                          variant="outlined"
                          type="text"
                          placeholder="Serial Number"
                          fullWidth
                        />
                      </Grid>
                      <Grid item container direction="row" alignItems="center">
                        <Grid item sm={3}>
                          <Box px={1}>
                            <RealTimeReader onSubmit={onBarcode} />
                          </Box>
                        </Grid>
                        <Grid item sm={9}>
                          <span>Click on this button and scan from the mobile device</span>
                        </Grid>
                      </Grid>
                      <Box px={2} pt={1} pb={2}>
                        {itemsets.length === 0 || labs.length === 0 ? (
                          <p>
                            No itemsets or labs. Cannot create an item without an itemset or a lab.
                          </p>
                        ) : (
                          ''
                        )}
                      </Box>

                      <Grid item>
                        <Box px={2} pb={2}>
                          Select the item set and lab from below list.
                          <b>
                            You can only set items to the labs that you are in charge of managing,
                          </b>
                        </Box>
                      </Grid>

                      <Grid item className={classes.margin} style={{ marginBottom: '10px' }}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="itemset-select-label">Itemset</InputLabel>
                          <Select
                            labelId="itemset-select-label"
                            name="itemset"
                            onChange={changeItemset}
                            defaultValue=""
                          >
                            {itemsets.map(itemset => (
                              <MenuItem key={itemset.id} value={itemset.id}>
                                {itemset.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item className={classes.margin}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="lab-select-label">Lab</InputLabel>
                          <Field
                            labelId="lab-select-label"
                            component={SelectFormik}
                            name="lab"
                            defaultValue=""
                          >
                            {labs.map(lab => (
                              <MenuItem key={lab.id} value={lab.id}>
                                {lab.title}
                              </MenuItem>
                            ))}
                          </Field>
                        </FormControl>
                      </Grid>

                      <Grid item>
                        <Box px={2} py={1}>
                          Key should be unique. If the key is duplicated, the later field will be
                          used. If a field is marked an editable, default value is not required.
                          <br />
                          You have to enter at least one attribute.
                        </Box>
                      </Grid>
                      <FieldArray
                        name="attributes"
                        render={arrayHelpers => (
                          <div>
                            {values.attributes.map((attribute, index) => (
                              <Grid
                                container
                                direction="row"
                                key={index.toString()}
                                style={{ marginBottom: '8px' }}
                              >
                                <Grid item sm={5}>
                                  <Field
                                    className={classes.margin}
                                    component={TextField}
                                    required
                                    name={`attributes.${index}.key`}
                                    variant="outlined"
                                    type="text"
                                    placeholder="key"
                                    fullWidth
                                    disabled={attribute.itemsetAttribute}
                                  />
                                </Grid>

                                <Grid item sm={6}>
                                  <Field
                                    className={classes.margin}
                                    component={TextField}
                                    required
                                    name={`attributes.${index}.value`}
                                    variant="outlined"
                                    type="text"
                                    placeholder="value"
                                    fullWidth
                                    disabled={!attribute.editable}
                                  />
                                </Grid>
                                <Grid item sm={1}>
                                  {!attribute.itemsetAttribute ? (
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
                                </Grid>
                              </Grid>
                            ))}
                            <Button
                              className={classes.margin}
                              variant="outlined"
                              startIcon={<AiOutlinePlusSquare />}
                              onClick={() =>
                                arrayHelpers.push({
                                  key: '',
                                  defaultValue: '',
                                  editable: true,
                                  itemsetAttribute: false
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
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </ProgressOverlay>
  );
}

CreateItemsPresenter.defaultProps = {
  error: null,
  success: null
};

CreateItemsPresenter.propTypes = {
  classes: PropTypes.object.isRequired,
  itemsets: PropTypes.arrayOf(Object).isRequired,
  labs: PropTypes.arrayOf(Object).isRequired,
  success: PropTypes.string,
  error: PropTypes.string,
  validationSchema: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(CreateItemsPresenter);
