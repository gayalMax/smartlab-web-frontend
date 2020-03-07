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

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: 200,
  },

}));

const LoginForm = () => {
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          disabled
          id="read-only-input"
          label="Email"
          className={clsx(classes.margin, classes.textField)}
          defaultValue="EmailShouldBeHere"
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
        <br />
      </div>
      <div>
        <TextField
          required
          id="standard-basic"
          label="First Name"
          value={values.firstName}
          onChange={handleChange('firstName')}
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          required
          id="standard-basic"
          label="Last Name"
          value={values.lastName}
          onChange={handleChange('lastName')}
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        />
      </div>
      <div>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            variant="outlined"
            value={values.password}
            onChange={handleChange('password')}
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
            labelWidth={70}
          />
        </FormControl>
      </div>
    </form>
  );
};

export default LoginForm;
