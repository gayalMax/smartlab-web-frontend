import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import RequestItemPresenter from './RequestItem.presenter';
import {
  supervisorItemManagementSyncItem,
  supervisorItemManagementAcceptRequest,
  supervisorItemManagementRejectRequest
} from '../../redux/actions/SupervisorItemManagementActions';

function RequestItem() {
  const dispatch = useDispatch();
  const {
    syncedItem,
    itemsSyncLoading,
    itemsSyncSuccess,
    itemsSyncError,
    acceptRequestLoading,
    acceptRequestSuccess,
    acceptRequestError,
    rejectRequestLoading,
    rejectRequestSuccess,
    rejectRequestError
  } = useSelector(state => ({
    ...state.supervisorItemManagement
  }));

  const { requestToken } = useParams();

  const acceptValue = true;
  const acceptDeclineReason = null;
  const rejectValue = false;
  const schema = yup.object().shape({
    reason: yup.string().required('Required')
  });
  useEffect(() => {
    if (!itemsSyncLoading && !itemsSyncSuccess && !itemsSyncError) {
      dispatch(supervisorItemManagementSyncItem(requestToken));
    }
  }, [dispatch, requestToken, itemsSyncLoading, itemsSyncSuccess, itemsSyncError, syncedItem]);

  const onRefresh = () => {
    dispatch(supervisorItemManagementSyncItem(requestToken));
  };

  const onAccept = () => {
    dispatch(supervisorItemManagementAcceptRequest(requestToken, acceptValue, acceptDeclineReason));
  };
  const onSubmit = (values, { setSubmitting }) => {
    const complete = () => {
      setSubmitting(false);
    };
    dispatch(
      supervisorItemManagementRejectRequest(requestToken, rejectValue, values.reason, complete)
    );
  };
  return (
    <RequestItemPresenter
      loading={itemsSyncLoading || acceptRequestLoading || rejectRequestLoading}
      items={syncedItem}
      error={itemsSyncError || acceptRequestError || rejectRequestError}
      onRefresh={onRefresh}
      onAccept={onAccept}
      validationSchema={schema}
      onSubmit={onSubmit}
      success={acceptRequestSuccess || rejectRequestSuccess}
    />
  );
}

export default RequestItem;
