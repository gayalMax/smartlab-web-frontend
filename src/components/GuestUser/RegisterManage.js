/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import PageNotFound from '../Common/PageNotFound';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles(() => ({
  root: {
    display: 'float',
    marginLeft: '50%',
    marginRight: 'auto',
    marginTop: '30%',
    marginBottom: 'auto',
    // },
  },
}));

const RegisterManage = (props) => {

  const classes = useStyles();

  const { match } = props;

  const [state, setState] = React.useState({
    redirect: false,
    registertoken: match.params.registertoken,
    email: '',
    role: '',
  });

  useEffect(() => {
    // console.log(values.registertoken);
    axios.get(`http://localhost:8000/api/registration/verify/${state.registertoken}`)
      // .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setState({ ...state, email: res.data.email, role: res.data.Role.name });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err.message);
        setState({ ...state, redirect: true });
      });
  }, []);

  if (state.redirect) {
    return <PageNotFound />;
  }
  if (state.email) {
    return (
      <RegisterForm
        email={state.email}
        role={state.role}
        registertoken={state.registertoken}
      />
    );
  }
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default RegisterManage;
