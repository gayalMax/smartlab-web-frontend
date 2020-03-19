import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import styles from './PageNotFound.styles';

function PageNotFound({ classes }) {
  return (
    <div className={classes.center}>
      <img className={classes.image} src="/images/404.png" alt="404" />
    </div>
  );
}

PageNotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageNotFound);
