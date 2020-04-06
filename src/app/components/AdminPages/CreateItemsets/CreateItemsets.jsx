import React from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import CreateItemSetsPresenter from './CreateItemsets.presenter';
import { adminItemManagementCreateItemset } from '../../../redux/actions/AdminItemManagementActions';

function CreateItemsets() {
  const dispatch = useDispatch();

  const { createItemsetError, createItemsetLoading, createItemsetSuccess, token } = useSelector(
    state => ({
      ...state.adminItemManagement,
      token: state.auth.token
    })
  );

  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    image: yup.string().nullable(),
    attributes: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            editable: yup.boolean(),
            key: yup.string().required('Required'),
            defaultValue: yup.string().when('editable', {
              is: false,
              then: yup.string().required('Required')
            })
          })
          .required('Required')
      )
      .required()
      .min(1, 'Choose at least one')
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const complete = () => {
      setSubmitting(false);
    };

    await dispatch(
      adminItemManagementCreateItemset(
        token,
        values.title,
        values.image,
        values.attributes,
        complete
      )
    );
  };
  return (
    <CreateItemSetsPresenter
      validationSchema={schema}
      onSubmit={onSubmit}
      error={createItemsetError}
      success={createItemsetSuccess}
      loading={createItemsetLoading}
    />
  );
}

export default CreateItemsets;
