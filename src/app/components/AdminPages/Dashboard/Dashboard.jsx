import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './Dashboard.styles';

function Dashboard({ classes }) {
  return (
    <div className={classes.center}>
      <img className={classes.image} src="/images/full_logo.png" alt="Open Inventory Logo" />
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
