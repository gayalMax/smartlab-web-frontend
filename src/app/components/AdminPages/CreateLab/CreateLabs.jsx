import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import CreateLabsPresenter from './CreateLabs.presenter';
import * as EVENTS from './CreateLabs.events';
import { FORM_SUBMIT } from '../InviteUsers/InviteUsers.events';
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
  const [formState, setFormState] = useState({ title: '', subTitle: '', imageID: null });
  // title was changed
  const schema = yup.object().shape({
    title: yup.string().required('Required'),
    subTitle: yup.string().required('Required')
  });
  const titleOnChange = event => {
    setFormState({ ...formState, title: event.target.value });
  };
  //   subtitle was changed
  const subTitleOnChange = event => {
    setFormState({ ...formState, subTitle: event.target.value });
  };

  //set image id
  const uploadImage = publicId => {
    setFormState({ ...formState, imageID: publicId });
  };

  const onSubmit = (values, { setSubmitting }) => {
    const complete = () => {
      setSubmitting(false);
    };
    dispatch(adminLabManagementCreateLab(token, values.title, values.subTitle,complete));
  };

  const handleEvent = event => {
    switch (event) {
      case EVENTS.TITLE_ON_CHANGE:
        return titleOnChange;
      case EVENTS.SUBTITLE_ON_CHANGE:
        return subTitleOnChange;
      case FORM_SUBMIT:
        return onSubmit;
      case EVENTS.UPLOAD_IMAGE:
        return uploadImage;
      default:
        return () => {};
    }
  };

  return (
    <CreateLabsPresenter
      handleEvent={handleEvent}
      validationSchema={schema}
      loading={labCreationLoading}
      success={labCreationSuccess}
      error={labCreationError}
    />
  );
}

export default CreateLabs;
