import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Grid, Box, IconButton, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AiOutlineClose } from 'react-icons/ai';

const SuccessErrorAlert = ({ error, success }) => {
  const [successShow, setSuccessShow] = React.useState(false);
  const [errorShow, setErrorShow] = React.useState(false);

  useEffect(() => {
    setSuccessShow(success !== null);
    setErrorShow(error !== null);
  }, [error, success, setErrorShow, setSuccessShow]);

  const successCloseButton = (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setSuccessShow(false);
      }}
    >
      <AiOutlineClose fontSize="inherit" />
    </IconButton>
  );

  const errorCloseButton = (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setErrorShow(false);
      }}
    >
      <AiOutlineClose fontSize="inherit" />
    </IconButton>
  );

  return (
    <>
      <Grid item>
        <Collapse in={errorShow}>
          <Box pb={2}>
            <Alert severity="error" action={errorCloseButton}>
              {error}
            </Alert>
          </Box>
        </Collapse>
      </Grid>
      <Grid item>
        <Collapse in={successShow}>
          <Box pb={2}>
            <Alert action={successCloseButton}>{success}</Alert>
          </Box>
        </Collapse>
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
