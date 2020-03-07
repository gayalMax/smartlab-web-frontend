import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Joi from '@hapi/joi';

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

const LoginForm = () => {
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    password: '',
    rePassword: '',
    showPassword: false,
    errorMessage: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const changeErrorMessage = (message) => {
    setValues({ ...values, errorMessage: message });
  };


  const classes = useStyles();

  const schema = Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .required(),

    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    rePassword: Joi.ref('password'),

    showPassword: Joi.any(),

    errorMessage: Joi.any(),
  });

  const validation = async (ip) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const value = await schema.validateAsync(ip);
    } catch (err) {
      changeErrorMessage(err.message);
    }
  };

  return (
    <form
      className={clsx(classes.root)}
      noValidate
      autoComplete="off"
    // action={
    //   console.log('Hello')
    //   // schema.validate({ values })
    //   // validation(values)
    // }
    >
      <Card className={clsx(classes.outerGrid)}>
        <CardContent>
          <Grid className={clsx(classes.textMargin, classes.textField)}>
            <h2>Sign Up</h2>
            <p className={clsx(classes.paragraph)}>
              You have been offered the role of |role|.
              Please sign up to create an account and get started
            </p>
            <p className={clsx(classes.paragraph, classes.warning)}>{values.errorMessage}</p>
          </Grid>
          <Grid>
            <TextField
              className={clsx(classes.margin, classes.textField)}
              disabled
              id="read-only-input"
              label="Email"
              defaultValue="EmailShouldBeHere"
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
              id="standard-basic"
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
              id="standard-basic"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange('lastName')}
              variant="outlined"
            />
          </Grid>
          <Grid>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                variant="outlined"
                value={values.password}
                onChange={handleChange('password')}
                labelWidth={70}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )}
              />
              <p className={classes.paragraph}>
                Use 8 or more characters with a mix of letters, symbols and numbers
              </p>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirm</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                variant="outlined"
                value={values.rePassword}
                onChange={handleChange('rePassword')}
                labelWidth={70}
              />
            </FormControl>
          </Grid>
          <Grid>
            {/* <input type="submit" value="Submit" /> */}
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                validation(values);
                // schema.validate({ values });
              }}
            >
              Submit
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </form>

  );
};

export default LoginForm;
