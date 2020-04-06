import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import CreateRolesPresenter from './CreateRoles.presenter';
import adminAdministrationSyncPermissions from '../../../redux/actions/AdminAdministration/adminAdministrationSyncPermissions';
import { adminAdministrationCreateRole } from '../../../redux/actions/AdminAdministrationActions';

function CreateRoles() {
  const dispatch = useDispatch();

  const {
    permissions,
    permissionsSyncLoading,
    permissionsSyncSuccess,
    permissionsSyncError,
    roleCreateLoading,
    roleCreateSuccess,
    roleCreateError,
    token
  } = useSelector(state => ({
    ...state.adminAdministration,
    token: state.auth.token
  }));

  useEffect(() => {
    if (!permissionsSyncLoading && !permissionsSyncSuccess && !permissionsSyncError) {
      dispatch(adminAdministrationSyncPermissions(token));
    }
  }, [token, dispatch, permissionsSyncLoading, permissionsSyncSuccess, permissionsSyncError]);

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
      error={roleCreateError || permissionsSyncError}
      loading={roleCreateLoading || permissionsSyncLoading}
      success={roleCreateSuccess}
      validationSchema={schema}
      onSubmit={onSubmit}
    />
  );
}

export default CreateRoles;
