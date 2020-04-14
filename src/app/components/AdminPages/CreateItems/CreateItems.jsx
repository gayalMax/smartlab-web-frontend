import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import CreateItemSetsPresenter from './CreateItems.presenter';
import {
  adminItemManagementSyncItemsets,
  adminItemManagementCreateItem
} from '../../../redux/actions/AdminItemManagementActions';
import { adminLabManagementSyncLabs } from '../../../redux/actions/AdminLabManagementActions';

function CreateItems() {
  const dispatch = useDispatch();

  const {
    createItemError,
    createItemLoading,
    createItemSuccess,
    syncedItemsets,
    itemSetsSyncLoading,
    itemSetsSyncSuccess,
    itemSetsSyncError,
    labs,
    labsSyncLoading,
    labsSyncError,
    labsSyncSuccess,
    token
  } = useSelector(state => ({
    ...state.adminItemManagement,
    ...state.adminLabManagement,
    token: state.auth.token
  }));

  useEffect(() => {
    if (!itemSetsSyncLoading && !itemSetsSyncSuccess && !itemSetsSyncError) {
      dispatch(adminItemManagementSyncItemsets(token));
    }
    if (!labsSyncLoading && !labsSyncError && !labsSyncSuccess) {
      dispatch(adminLabManagementSyncLabs(token));
    }
  }, [
    token,
    dispatch,
    itemSetsSyncLoading,
    itemSetsSyncSuccess,
    itemSetsSyncError,
    labsSyncLoading,
    labsSyncSuccess,
    labsSyncError
  ]);

  const schema = yup
    .object()
    .shape({
      serialNumber: yup.string().required('Required'),
      itemset: yup.string().required('Required'),
      lab: yup.string().required('Required'),
      attributes: yup
        .array()
        .of(
          yup.object().shape({
            key: yup.string().required('Required'),
            value: yup.string().required('Required'),
            editable: yup.boolean().required('Required'),
            itemsetAttribute: yup.boolean().required('Required')
          })
        )
        .required('Required')
    })
    .required('Required');

  const onSubmit = async (values, { setSubmitting }) => {
    const complete = () => {
      setSubmitting(false);
    };
    values.attributes.forEach((attribute, index) => {
      if (!attribute.editable) {
        values.attributes.splice(index, 1);
      }
    });
    const itemValues = {
      ...values,
      attributes: values.attributes.map(attribute => ({
        key: attribute.key,
        value: attribute.value
      }))
    };

    dispatch(
      adminItemManagementCreateItem(
        token,
        itemValues.serialNumber,
        itemValues.itemset,
        itemValues.lab,
        itemValues.attributes,
        complete
      )
    );
  };
  return (
    <CreateItemSetsPresenter
      itemsets={syncedItemsets}
      labs={labs}
      validationSchema={schema}
      error={createItemError || itemSetsSyncError || labsSyncError}
      success={createItemSuccess}
      loading={createItemLoading || itemSetsSyncLoading || labsSyncLoading}
      onSubmit={onSubmit}
    />
  );
}

export default CreateItems;
