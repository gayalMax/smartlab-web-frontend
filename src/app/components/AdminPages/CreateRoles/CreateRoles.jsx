import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import CreateRolesPresenter from './CreateRoles.presenter';
import { ADMIN_ADMINISTRATION_CREATE_ROLE } from '../../../redux/actionTypes';
import { sliceStateByAction } from '../../../helpers/helpers';
import adminAdministrationSyncPermissions from '../../../redux/actions/AdminAdministration/adminAdministrationSyncPermissions';
import { adminAdministrationCreateRole } from '../../../redux/actions/AdminAdministration';

function CreateRoles() {
  const dispatch = useDispatch();

  const { permissions, error, loading, token, success } = useSelector(state =>
    sliceStateByAction(state.adminAdministration, ADMIN_ADMINISTRATION_CREATE_ROLE, state)
  );

  useEffect(() => {
    if (!loading && permissions.length === 0 && !error) {
      dispatch(adminAdministrationSyncPermissions(token));
    }
  }, [token, permissions, loading, error, dispatch]);

  const schema = yup.object().shape({
    name: yup.string().required('Required'),
    permissions: yup
      .array()
      .min(1, 'Choose at least one')
      .of(yup.string())

      .required('Required')
  });

  const onSubmit = (values, { setSubmitting }) => {
    const complete = () => {
      setSubmitting(false);
    };

    dispatch(adminAdministrationCreateRole(token, values.name, values.permissions, complete));
  };

  return (
    <CreateRolesPresenter
      permissions={permissions}
      error={error}
      loading={loading}
      success={success}
      validationSchema={schema}
      onSubmit={onSubmit}
    />
  );
}

export default CreateRoles;
