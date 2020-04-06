import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Grid, Snackbar, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AiOutlineClose } from 'react-icons/ai';

const SuccessErrorAlert = ({ error, success }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [success, error]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const button = (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setOpen(false);
      }}
    >
      <AiOutlineClose fontSize="inherit" />
    </IconButton>
  );

  return (
    <>
      <Grid item>
        <Snackbar
          open={error && open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" action={button}>
            {error}
          </Alert>
        </Snackbar>
      </Grid>
      <Grid item>
        <Snackbar
          open={success && open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" action={button}>
            {success}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

SuccessErrorAlert.defaultProps = {
  error: null,
  success: null
};

SuccessErrorAlert.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string
};

export default SuccessErrorAlert;
