import React from 'react';
import PropTypes from 'prop-types';
import styles from '../CreateLabs.styles';
import { Box, withStyles, Grid, TextField } from '@material-ui/core';

function LabTitleBoxPresenter({ classes, label, onChange }) {
  return (
    <Box>
      <Grid container >
        <Grid item xs>
          <TextField
           required 
           label={label} 
           variant="outlined" 
           onChange={onChange} />
        </Grid>
      </Grid>
    </Box>
  );
}

LabTitleBoxPresenter.proptype = {
  classes:PropTypes.func.isRequired,
  label:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired
}

export default withStyles(styles)(LabTitleBoxPresenter);
