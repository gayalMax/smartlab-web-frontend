import React from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import CreateItemSetsPresenter from './CreateItemsets.presenter';
import { ADMIN_LAB_CREATE_ITEMSET } from '../../../redux/actionTypes';
import { sliceStateByAction } from '../../../helpers/helpers';
import { adminLabCreateItemset } from '../../../redux/actions/AdminLabItemset';

function CreateItemSets() {
  const dispatch = useDispatch();

  const { error, loading, token, success } = useSelector(state =>
    sliceStateByAction(state.adminLab, ADMIN_LAB_CREATE_ITEMSET, state)
  );

  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    imageURL: yup.string().required('Required'),
    attributes: yup
      .array()
      .min(1, 'Choose at least one')
      .of(
        yup
          .object()
          .shape({
            editable: yup.boolean(),
            attributeName: yup.string(),
            attributeValue: yup.string().when('editable', {
              is: false,
              then: yup.string().required('Required')
            })
          })
          .required('Required')
      )
  });

  const onUpload = publicId => {
    console.log(publicId);
    return publicId;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    const complete = () => {
      setSubmitting(false);
    };

    dispatch(
      adminLabCreateItemset(token, values.title, values.image, values.permissions, complete)
    );
  };
  return (
    <CreateItemSetsPresenter
      validationSchema={schema}
      onUpload={onUpload}
      onSubmit={onSubmit}
      error={error}
      success={success}
      loading={loading}
    />
  );
}

export default CreateItemSets;
