import React from 'react';
import PropTypes from 'prop-types';
import LabTitleBoxPresenter from './LabTitleBox.Presenter';
import { useState } from 'react';

function LabTitleBox({ label, onChange }) {
  const [title, setTitle] = useState('');
  const onChangeEventHandler = event => {
    console.log('start');
    setTitle(event.target.value);
    console.log('end');
    onChange(event.target.value);
  };
  return (<LabTitleBoxPresenter label={label} onChange={onChangeEventHandler} />);
}

LabTitleBox.propTypes = {
  label: PropTypes.string.isRequired
};

export default LabTitleBox;
