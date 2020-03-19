import React from 'react';

/**
 * Returns text to be rendered on the sign in page
 * @param {string} roleName Name of user
 * @param {bool} loading Whether an async call is ongoing
 */
function informationTextLines(roleName, loading) {
  if (roleName) {
    return (
      <>
        You have been offered the role of&nbsp;
        <b>{roleName}</b>
        .
        <br />
        Please sign up to create an account and get started.
      </>
    );
  }
  if (loading) {
    return <>Please wait...</>;
  }

  return (
    <>
      Something went wrong!
      <br />
      Please contact system administrators for further assist.
    </>
  );
}

export default informationTextLines;
