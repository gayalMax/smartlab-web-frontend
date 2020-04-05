import React from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import CreateItemSetsPresenter from './CreateItemsets.presenter';
import { ADMIN_LAB_CREATE_ITEMSET } from '../../../redux/actionTypes';
import { sliceStateByAction } from '../../../helpers/helpers';
import { adminLabCreateItemset } from '../../../redux/actions/AdminLabItemset';

function CreateItemsets() {
  const dispatch = useDispatch();

  const { error, loading, token, success } = useSelector(state =>
    sliceStateByAction(state.adminLab, ADMIN_LAB_CREATE_ITEMSET, state)
  );

  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    image: yup.string().nullable(),
    attributes: yup
      .array()
      .min(1, 'Choose at least one')
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
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const complete = () => {
      setSubmitting(false);
    };

    await dispatch(
      adminLabCreateItemset(token, values.title, values.image, values.attributes, complete)
    );
  };
  return (
    <CreateItemSetsPresenter
      validationSchema={schema}
      onSubmit={onSubmit}
      error={error}
      success={success}
      loading={loading}
    />
  );
}

export default CreateItemsets;
