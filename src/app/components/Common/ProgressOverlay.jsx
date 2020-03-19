import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress, withStyles } from '@material-ui/core';

const style = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

function ProgressOverlay({ classes, visible, children }) {
  return (
    <>
      {children}
      <Backdrop className={classes.backdrop} open={visible}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

ProgressOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired
};

ProgressOverlay.defaultProps = {
  visible: false
};

export default withStyles(style)(ProgressOverlay);
