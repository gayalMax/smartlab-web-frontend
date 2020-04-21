import React from 'react';
import {
  Button,
  Grid,
  Dialog,
  Box,
  CircularProgress,
  Typography,
  DialogActions
} from '@material-ui/core';
import { AiOutlineMobile } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

import { socketStart, socketEnd } from '../../redux/actions/SocketActions';

const RealTimeReader = ({ onSubmit, variant, color }) => {
  const dispatch = useDispatch();
  const { token, lastEvent, showOverlay } = useSelector(state => ({
    ...state.socket,
    token: state.auth.token
  }));

  const handleClose = () => dispatch(socketEnd(token));

  const copy = () => {
    onSubmit(lastEvent && lastEvent.data && lastEvent.data.barcode);
    handleClose();
  };

  return (
    <div>
      <Grid container direction="column" alignItems="flex-start">
        <Grid item>
          <Button
            startIcon={<AiOutlineMobile />}
            color={color}
            variant={variant}
            onClick={() => dispatch(socketStart(token))}
          >
            Connect to Mobile App
          </Button>
        </Grid>
      </Grid>

      <Dialog
        aria-labelledby="dialog-title"
        open={showOverlay}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
      >
        <Grid container justify="center">
          <Box py={2}>
            {!lastEvent && (
              <Box pt={5} pb={1}>
                <CircularProgress color="secondary" />
              </Box>
            )}
            {lastEvent && (
              <Box pt={2} pb={1}>
                <Typography variant="h4">
                  {lastEvent && lastEvent.data && lastEvent.data.barcode}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
        <DialogActions>
          {lastEvent && (
            <Button onClick={copy} color="primary">
              Copy
            </Button>
          )}
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

RealTimeReader.defaultProps = {
  variant: 'contained',
  color: 'primary'
};

RealTimeReader.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  onSubmit: PropTypes.func.isRequired
};

export default RealTimeReader;
