import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import CreateLabsPresenter from './CreateLabs.presenter';
import { adminLabManagementCreateLab } from '../../../redux/actions/AdminLabManagementActions';

function CreateLabs() {
  // To dispatch api calls
  const dispatch = useDispatch();
  const {
    labCreationLoading,
    labCreationError,
    labCreationSuccess,
    token
  } = useSelector(state => ({ ...state.adminLabManagement, token: state.auth.token }));

  // title was changed
  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    subTitle: yup.string().required('Required'),
    image: yup.string().nullable()
  });

  const onSubmit = (values, { setSubmitting }) => {
    const complete = () => {
      setSubmitting(false);
    };
    dispatch(
      adminLabManagementCreateLab(token, values.title, values.subTitle, values.image, complete)
    );
  };

  return (
    <CreateLabsPresenter
      onSubmit={onSubmit}
      validationSchema={schema}
      loading={labCreationLoading}
      success={labCreationSuccess}
      error={labCreationError}
    />
  );
}

export default CreateLabs;
