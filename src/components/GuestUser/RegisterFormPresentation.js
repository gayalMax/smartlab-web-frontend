/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textMargin: {
    marginLeft: theme.spacing(7),
    width: 300,
    alignContent: 'left',
  },
  outerGrid: {
    width: 450,
    margin: 'auto',
  },
  textField: {
    width: 300,
  },
  paragraph: {
    fontSize: 12,
    textAlign: 'left',
  },
  warning: {
    color: 'red',
  },

}));

const RegisterFormPresentation = (props) => {
  const { values } = props;
  const { handleChange } = props;
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <form
      className={clsx(classes.root)}
      noValidate
      autoComplete="off"
    >
      <Card className={clsx(classes.outerGrid)}>
        <CardContent>
          <Grid className={clsx(classes.textMargin, classes.textField)}>
            <h2>Sign Up</h2>
            {/* {values.role === '')?} */}
            <p className={clsx(classes.paragraph)}>
              You have been offered the role of
              {' '}
              {values.role}
              .
              Please sign up to create an account and get started
            </p>
            <p className={clsx(classes.paragraph)}>
              Invalid token!!!
            </p>
            <p className={clsx(classes.paragraph, classes.warning)}>{values.errorMessage}</p>
          </Grid>
          <Grid>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              disabled
              id="email"
              label="Email"
              value={values.email}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              required
              id="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange('firstName')}
              variant="outlined"
            />
          </Grid>
          <Grid>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              required
              id="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange('lastName')}
              variant="outlined"
            />
          </Grid>
          <Grid>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              id="password"
              label="Password"
              value={values.password}
              onChange={handleChange('password')}
              variant="outlined"
              type="password"
            />
          </Grid>
          <Grid>
            <FormControl>
              <TextField
                className={clsx(classes.margin, classes.textField)}
                id="rePassword"
                label="Confirm"
                value={values.rePassword}
                onChange={handleChange('rePassword')}
                type="password"
                variant="outlined"

              />
            </FormControl>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={values.role === ''}
            >
              Submit
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </form>

  );
};

// RegisterFormPresentation.propTypes = {
//   values: PropTypes.object,
//   handleChange: PropTypes.func,
//   changeErrorMessage: PropTypes.func,
//   handleSubmit: PropTypes.func,
// };


export default RegisterFormPresentation;
