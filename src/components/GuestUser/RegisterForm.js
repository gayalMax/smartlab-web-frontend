/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Joi from '@hapi/joi';
import axios from 'axios';
import RegisterFormPresentation from './RegisterFormPresentation';

const RegisterForm = (props) => {
  const { match } = props;
  const [values, setValues] = React.useState({
    registertoken: match.params.registertoken,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    rePassword: '',
    showPassword: false,
    errorMessage: '',
    role: '',
  });

  // const obj = { token: values.registertoken };

  useEffect(() => {
    // console.log(values.registertoken);
    axios.get(`http://localhost:8000/api/registration/verify/${values.registertoken}`)
      // .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setValues({ ...values, email: res.data.email, role: res.data.Role.name });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err.message);
      });
  }, []);


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const changeErrorMessage = (message) => {
    setValues({ ...values, errorMessage: message });
  };

  const schema = Joi.object({

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: false } }),

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

    registertoken: Joi.any(),

    role: Joi.any(),
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
      const registrationData = {
        token: values.registertoken, // should be taken by a token
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      };

      await axios.post('http://localhost:8000/api/registration/register', registrationData)
        .then((res) => {
          console.log('Success: ', res);
        })
        .catch((err) => {
          console.log('Axios error: ', err.message);
        });
    }
  };

  return (
    <RegisterFormPresentation
      values={values}
      handleChange={handleChange}
      changeErrorMessage={changeErrorMessage}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterForm;
