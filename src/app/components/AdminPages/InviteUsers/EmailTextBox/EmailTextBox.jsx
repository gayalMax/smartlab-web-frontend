import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import EmailTextBoxPresenter from './EmailTextBox.presenter';

const emailRegex = /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

function EmailTextBox({ error, onChange }) {
  // Emails state management
  const [emails, setEmails] = useState([]);

  // Error message to show
  let textBoxErrorMessage = error;
  // Unique email list
  const uEmails = new Set();

  // Get unique emails while detecting duplicates
  emails.forEach(email => {
    if (!textBoxErrorMessage && uEmails.has(email)) {
      textBoxErrorMessage = `Duplicate email address(es) detected: ${email}`;
    }
    uEmails.add(email);
  });

  // Text was changed - must update emails list using regex
  const onChangeEventHandler = event => {
    const text = event.target.value;
    let extractedEmails = text.match(emailRegex);
    if (!extractedEmails) {
      extractedEmails = [];
    }
    onChange(extractedEmails);
    setEmails(extractedEmails);
  };

  return (
    <EmailTextBoxPresenter
      error={textBoxErrorMessage}
      emails={[...uEmails]}
      onChange={onChangeEventHandler}
    />
  );
}

EmailTextBox.defaultProps = {
  error: null
};

EmailTextBox.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default EmailTextBox;
