import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import CreateSupervisorsPresenter from './CreateSupervisors.presenter';
import { adminAdministrationCreateSupervisor } from '../../../redux/actions/AdminAdministrationActions';

function CreateSupervisors() {
  // To dispatch api calls
  const dispatch = useDispatch();

  const {
    supervisorCreateLoading,
    supervisorCreateError,
    supervisorCreateSuccess,
    token
  } = useSelector(state => ({ ...state.adminAdministration, token: state.auth.token }));

  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('Required'),
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required')
  });

  const onSubmit = (values, { setSubmitting }) => {
    const complete = () => {
      setSubmitting(false);
    };
    dispatch(
      adminAdministrationCreateSupervisor(
        token,
        values.firstName,
        values.lastName,
        values.email,
        complete
      )
    );
  };

  return (
    <CreateSupervisorsPresenter
      onSubmit={onSubmit}
      validationSchema={schema}
      loading={supervisorCreateLoading}
      success={supervisorCreateSuccess}
      error={supervisorCreateError}
    />
  );
}

export default CreateSupervisors;
