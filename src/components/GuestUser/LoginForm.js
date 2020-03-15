/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from '@hapi/joi';
import axios from 'axios';
import LoginFormPresentation from './LoginFormPresentation';

const LoginForm = () => {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    errorMessage: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const changeErrorMessage = (message) => {
    setValues({ ...values, errorMessage: message });
  };

  const schema = Joi.object({

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } }),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    errorMessage: Joi.any(),

  });

  const validation = async (ip) => {
    let validationSuccess = true;
    try {
      await schema.validateAsync(ip);
    } catch (err) {
      changeErrorMessage(err.message);
      validationSuccess = false;
    }
    return validationSuccess;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationSuccess = await validation(values);


    if (validationSuccess) {
      const loginData = {
        email: values.email,
        password: values.password,
      };

      await axios.post('http://localhost:8000/api/login', loginData)
        .then((res) => {
          console.log('Success: ', res.data);
        })
        .catch((err) => {
          console.log('Axios error: ', err.message);
        });
    }
  };

  return (
    <div>
      <LoginFormPresentation
        values={values}
        handleChange={handleChange}
        changeErrorMessage={changeErrorMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginForm;
